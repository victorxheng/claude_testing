
import React from 'react';

const FaqSection = () => {
  return (
    <div className="relative">

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {/* Add FAQ items here */}
            <div className="pt-6">
              <dt className="font-semibold text-gray-900">
                What is vly.ai and how does it work?
              </dt>
              <dd className="mt-2 text-gray-700">
                vly.ai is a revolutionary no-code platform that allows you to
                generate SaaS apps using natural language. We leverage
                state-of-the-art language models and a highly optimized
                knowledge base with vector retrievals and a recursive iteration
                system to provide you with full control over creating and
                modifying web apps, all without writing a single line of code.
              </dd>
            </div>

            {/* Add more FAQ items here */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
