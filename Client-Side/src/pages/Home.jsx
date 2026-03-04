import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { firebaseUser } = useAuth();

  return (
    <div>
      <section className="relative bg-dark min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80')" }}
        ></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-4">Save Lives Today</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Donate Blood,<br />Keep the World<br />
              <span className="text-red-500">Beating</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              Connect with blood donors near you. Every donation can save up to three lives. Join our community of lifesavers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/donors"
                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-4 rounded transition-colors text-center"
              >
                Find a Donor
              </Link>
              {!firebaseUser ? (
                <Link
                  to="/register"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded transition-colors text-center"
                >
                  Register Now
                </Link>
              ) : (
                <Link
                  to="/create-donor"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded transition-colors text-center"
                >
                  Become a Donor
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex gap-8 mb-10">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-dark">12+</p>
                  <p className="text-sm text-gray-500 mt-1">Blood Centers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-dark">50+</p>
                  <p className="text-sm text-gray-500 mt-1">Expert Staff</p>
                </div>
                <div className="text-4xl font-extrabold text-center">
                  <p className="text-dark">100+</p>
                  <p className="text-sm text-gray-500 mt-1 font-normal">Donations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80"
                    alt="Blood donation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80"
                    alt="Medical staff"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark leading-tight mb-6">
                Dedicated to Life, The Story of Our Blood Drive Initiative
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Our platform connects donors with recipients across Bangladesh, making it easier than ever to find the right blood type at the right time. We believe every drop counts.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h4 className="font-bold text-dark mb-2">Have a Question?</h4>
                <p className="text-gray-500 text-sm mb-3">Reach out to our support team anytime</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Call Us:</span> +880 1XXX-XXXXXX
                </p>
                <Link
                  to="/create-request"
                  className="inline-block mt-4 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">
              The Lifesaving Work We Do<br />for Communities in Need
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                <svg className="w-7 h-7 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Blood Donation</h3>
              <p className="text-gray-500 leading-relaxed">
                Register as a donor and help save lives. Your single donation can help up to three people in critical need.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                <svg className="w-7 h-7 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Find Donors</h3>
              <p className="text-gray-500 leading-relaxed">
                Search for compatible donors filtered by blood type, division, and district across the country.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                <svg className="w-7 h-7 text-red-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Request Blood</h3>
              <p className="text-gray-500 leading-relaxed">
                Post urgent blood requests and get connected with available donors in your area instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">Steps & Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">
              Giving Blood Made Easy, Here's How
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-red-700 flex items-center justify-center mx-auto shadow-lg shadow-red-700/30">
                  <span className="text-white text-2xl font-extrabold">01</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Register & Create Profile</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Sign up with your email and create your donor profile with blood type and location details.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-red-700 flex items-center justify-center mx-auto shadow-lg shadow-red-700/30">
                  <span className="text-white text-2xl font-extrabold">02</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Blood Donation</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Get matched with recipients who need your blood type and coordinate the donation process.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-red-700 flex items-center justify-center mx-auto shadow-lg shadow-red-700/30">
                  <span className="text-white text-2xl font-extrabold">03</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Save Lives</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Your donation reaches those in need and helps save up to three lives with a single donation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-lg overflow-hidden h-96">
              <img
                src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?w=800&q=80"
                alt="Why donate blood"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">Why Donate?</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark leading-tight mb-8">
                The Life You Save Could Be Someone You Love
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-dark text-sm mb-1">Your Blood, Their Second Chance</h4>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-dark text-sm mb-1">Urgent Need, Every Day</h4>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-dark text-sm mb-1">Save Lives in Minutes</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-red-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Every Drop Matters! Join Us & Be a Lifesaver!
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">
            Whether you're a donor or someone in need, our platform makes it easy to connect. Register today and make a difference.
          </p>
          <Link
            to={firebaseUser ? '/create-donor' : '/register'}
            className="bg-white text-red-700 hover:bg-red-50 font-bold px-10 py-4 rounded transition-colors text-lg inline-block"
          >
            {firebaseUser ? 'Register as Donor' : 'Join Now'}
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">
              Lives Changed: Stories from<br />Donors & Recipients
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "I found a donor within minutes when my father needed an emergency transfusion. This platform literally saved his life. Forever grateful."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-700 font-bold">RS</span>
                </div>
                <div>
                  <p className="font-bold text-dark">Rahim Sarker</p>
                  <p className="text-sm text-gray-500">Blood Recipient</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "Being a regular donor gives me purpose. The platform makes it so easy to manage my availability and help those in need."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-700 font-bold">FA</span>
                </div>
                <div>
                  <p className="font-bold text-dark">Fatema Akter</p>
                  <p className="text-sm text-gray-500">Regular Donor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-3">Blood Types</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark">
              Know Your Blood Type
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
              <Link
                key={type}
                to={`/donors?bloodType=${encodeURIComponent(type)}`}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all border border-gray-100 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-red-100 group-hover:bg-red-700 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <span className="text-2xl font-extrabold text-red-700 group-hover:text-white transition-colors">{type}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 group-hover:text-red-700 transition-colors">Find Donors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
