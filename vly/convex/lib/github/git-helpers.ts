import { Octokit } from "@octokit/rest";
import * as base64 from "base-64";
import * as utf8 from "utf8";

// Replace with your GitHub token
const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN";
const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME";

// Configure Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Function to create a new GitHub repository
async function createRepo(repoName: string) {
  try {
    const response = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
    });
    console.log(`Repository ${repoName} created at ${response.data.html_url}`);
    return response.data;
  } catch (error) {
    console.error("Error creating repository:", error);
  }
}

// Function to fetch the content of a file from the repository
async function fetchFileContent(owner: string, repo: string, path: string, branch: string = "main") {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if ('content' in data) {
      const decodedContent = utf8.decode(base64.decode(data.content));
      return { content: decodedContent, sha: data.sha };
    }
    return { content: "", sha: "" };
  } catch (error) {
    console.error("Error fetching file content:", error);
    return { content: "", sha: "" };
  }
}

// Function to commit a file directly to the GitHub repository
async function commitFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  branch: string = "main",
  sha: string
) {
  const encodedContent = base64.encode(utf8.encode(content));

  try {
    // Get the current commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    const commitSha = refData.object.sha;

    // Get the current commit tree SHA
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: commitSha,
    });
    const treeSha = commitData.tree.sha;

    // Create a new tree with the updated file
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: treeSha,
      tree: [
        {
          path,
          mode: "100644",
          type: "blob",
          content,
        },
      ],
    });

    // Create a new commit with the new tree
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message,
      tree: treeData.sha,
      parents: [commitSha],
    });

    // Update the reference to point to the new commit
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    });

    console.log(`File ${path} committed to repository ${owner}/${repo}`);
  } catch (error) {
    console.error("Error committing file:", error);
  }
}

// Function to create an initial commit and then edit the file
async function main() {
  const repoName = "my-new-repo";
  const filePath = "README.md";
  const initialContent = "# My New Repository";
  const initialCommitMessage = "Initial commit";
  const editContent = "\n\nAppended content.";
  const editCommitMessage = "Appended to README.md";

  // Create the GitHub repository
  const repo = await createRepo(repoName);

  if (repo) {
    const { owner, name } = repo;

    // Initial commit
    await commitFile(GITHUB_USERNAME, name, filePath, initialContent, initialCommitMessage, "main", "");

    // Fetch the current content of the file
    const { content: currentContent, sha } = await fetchFileContent(GITHUB_USERNAME, name, filePath);

    if (currentContent) {
      // Append new content to the current content
      const updatedContent = currentContent + editContent;

      // Commit the updated content
      await commitFile(GITHUB_USERNAME, name, filePath, updatedContent, editCommitMessage, "main", sha);
    }
  }
}

// Run the main function
main();