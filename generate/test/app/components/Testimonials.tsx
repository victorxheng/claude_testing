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
  // Add more testimonials as needed
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
