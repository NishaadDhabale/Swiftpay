


import React from 'react';
import {
  Smartphone,
  Shield,
  Zap,
  Gift,
  Users,
  CreditCard,
  Download,
  Play,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Wallet,
  Send,
  QrCode
} from 'lucide-react';
import {  useNavigate } from 'react-router-dom';

export const Initial=()=> {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Swiftpay
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#security" className="text-gray-700 hover:text-blue-600 transition-colors">Security</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <div>
              <span className="p-1">
            <button onClick={
()=>{
  navigate("/signup")
}
            }

            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ">
              SignUp
            </button>
            </span>
            <button onClick={
              ()=>{
                navigate("/signin")
              }
            }className=" bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Login
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  The Future of
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Digital Payments
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Send money, pay bills, and manage your finances with the most secure and fastest payment platform. Experience seamless transactions at your fingertips.
                </p>
              </div>

              {/*<div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                  <Download className="w-5 h-5" />
                  <span>Download for iOS</span>
                </button>
                <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                  <Play className="w-5 h-5" />
                  <span>Get on Android</span>
                </button>
              </div>*/}

              {/*<div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50M+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">₹2T+</div>
                  <div className="text-gray-600">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>*/}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Your Balance</div>
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₹12,450</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Send className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-sm">Sent to John</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-₹500</div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Send className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm">Coffee Shop</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-₹250</div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Gift className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-sm">Cashback</div>
                      </div>
                      <div className="text-sm font-semibold text-green-500">+₹50</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Why Choose SwiftPay?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of security, speed, and convenience with our cutting-edge payment technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete transactions in under 3 seconds with our advanced payment processing technology.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your money and data are protected with encryption and authentication.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rewards & Cashback</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn rewards and cashback on every transaction. The more you use, the more you save.
              </p>
            </div>

            {/*<div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Split Bills</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily split bills with friends and family. No more awkward money conversations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Payment Options</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect multiple bank accounts, cards, and UPI IDs in one secure platform.
              </p>
            </div>*/}

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
              <p className="text-gray-600 leading-relaxed">
                Make payments anytime, anywhere. Our services are available round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with PhonePay in three simple steps and experience the future of digital payments.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900"> Register</h3>
              <p className="text-gray-600 leading-relaxed">
                Signup onto the SwiftPay platform and register with your email. Verify your identity in seconds.
              </p>
            </div>

            {/*<div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Link Your Bank</h3>
              <p className="text-gray-600 leading-relaxed">
                Securely connect your bank account or add your favorite payment methods to get started.
              </p>
            </div>*/}

            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Start Paying</h3>
              <p className="text-gray-600 leading-relaxed">
                Send money, pay bills, shop online, and earn rewards with every transaction you make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Your Security is Our
                  <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent block">
                    Top Priority
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We use the latest security technologies to ensure your money and personal information are always protected.
                </p>
              </div>

              <div className="space-y-4">
                {/*<div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700">256-bit SSL Encryption</span>
                </div>*/}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700"> Authentication</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700"> Compliant Registry</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700"> Fraud Monitoring</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-8 space-y-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Secured by Design</h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Every transaction is protected with A-grade encryption and real-time fraud detection.
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 text-center">Trusted by  million users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Payments?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join millions of users who trust PhonePay for their daily transactions. Download now and get ₹100 bonus on your first payment.
            </p>
           {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                <Download className="w-5 h-5" />
                <span>Download for iOS</span>
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                <Play className="w-5 h-5" />
                <span>Get on Android</span>
              </button>
            </div>*/}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SwiftPay</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The future of digital payments is here. Secure, fast, and reliable transactions at your fingertips.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Security</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">API</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">support@swiftpay.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
               2025 SwiftPay | Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

