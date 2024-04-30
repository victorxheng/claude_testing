'use client'

const testimonials = [
  {
    name: 'John Doe',
    role: 'Co-founder & CEO',
    company: 'Startup Inc.',
    testimonial: 'YC Co-founder Matching helped me find the perfect technical co-founder for my startup. We connected through the platform and have been working together successfully for the past year.',
  },
  {
    name: 'Jane Smith',
    role: 'Co-founder & CTO',
    company: 'Tech LLC',
    testimonial: 'As a technical founder, I was looking for a business-savvy partner. YC Co-founder Matching made it easy to connect with potential matches and find the right fit.',
  },
  {
    name: 'Mark Johnson',
    role: 'Co-founder & COO',
    company: 'SaaS Startup',
    testimonial: 'Finding a co-founder with complementary skills was crucial for our startup. YC Co-founder Matching connected me with an amazing technical co-founder and we\'ve been able to grow our company together.',
  },
  {
    name: 'Emily Davis',
    role: 'Co-founder & CPO',
    company: 'Health Tech Inc.',
    testimonial: 'As a non-technical founder in the healthcare space, I needed a partner who could handle the technical aspects. YC Co-founder Matching helped me find the perfect match and we\'ve built a successful health tech company.',
  },
  {
    name: 'Alex Brown',
    role: 'Co-founder & CMO',
    company: 'E-commerce Venture',
    testimonial: 'I had a great business idea but lacked the technical skills to bring it to life. Through YC Co-founder Matching, I found a talented technical co-founder and we\'ve built a thriving e-commerce business.',
  },
  {
    name: 'Sarah Lee',
    role: 'Co-founder & CDO',
    company: 'AI Startup',
    testimonial: 'Finding a co-founder with expertise in AI and machine learning was essential for our startup. YC Co-founder Matching made the process easy and connected me with an incredible technical partner.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Founder Success Stories</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">See what our users have to say about finding their co-founders through our platform.</p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, testimonialIndex) => (
              <div key={testimonialIndex} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.testimonial}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
