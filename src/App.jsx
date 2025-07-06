import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Users, Zap, Shield } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')
  const [marketData, setMarketData] = useState([])

  useEffect(() => {
    const mockCryptoData = [
      { name: 'BTC', price: 45234.67, change: 2.34, volume: '1.2B', marketCap: '850B' },
      { name: 'ETH', price: 3456.78, change: -1.23, volume: '800M', marketCap: '415B' },
      { name: 'ADA', price: 1.23, change: 5.67, volume: '250M', marketCap: '42B' },
      { name: 'SOL', price: 98.45, change: 3.45, volume: '180M', marketCap: '45B' },
      { name: 'DOT', price: 23.45, change: -0.78, volume: '95M', marketCap: '26B' },
      { name: 'LINK', price: 14.67, change: 1.89, volume: '120M', marketCap: '8.2B' },
    ]

    const mockMarketData = [
      { time: '00:00', BTC: 44800, ETH: 3400, ADA: 1.18, SOL: 95.2, DOT: 23.8, LINK: 14.2 },
      { time: '04:00', BTC: 45100, ETH: 3420, ADA: 1.20, SOL: 96.8, DOT: 23.6, LINK: 14.4 },
      { time: '08:00', BTC: 44950, ETH: 3380, ADA: 1.15, SOL: 94.5, DOT: 23.2, LINK: 14.1 },
      { time: '12:00', BTC: 45300, ETH: 3450, ADA: 1.22, SOL: 98.1, DOT: 23.7, LINK: 14.6 },
      { time: '16:00', BTC: 45150, ETH: 3435, ADA: 1.21, SOL: 97.8, DOT: 23.5, LINK: 14.5 },
      { time: '20:00', BTC: 45234, ETH: 3457, ADA: 1.23, SOL: 98.45, DOT: 23.45, LINK: 14.67 },
    ]

    setCryptoData(mockCryptoData)
    setMarketData(mockMarketData)
  }, [])

  const CryptoCard = ({ crypto }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-dark-200 glass rounded-xl p-6 hover-lift cursor-pointer"
      onClick={() => setSelectedCrypto(crypto.name)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-accent-100 to-accent-300 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{crypto.name}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{crypto.name}</h3>
            <p className="text-gray-400 text-sm">{crypto.name}/USD</p>
          </div>
        </div>
        {crypto.change > 0 ? (
          <TrendingUp className="w-5 h-5 text-success" />
        ) : (
          <TrendingDown className="w-5 h-5 text-error" />
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Price</span>
          <span className="text-white font-semibold">${crypto.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">24h Change</span>
          <span className={`font-semibold ${crypto.change > 0 ? 'text-success' : 'text-error'}`}>
            {crypto.change > 0 ? '+' : ''}{crypto.change}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Volume</span>
          <span className="text-white">{crypto.volume}</span>
        </div>
      </div>
    </motion.div>
  )

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark-200 glass rounded-xl p-6 hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-sm font-semibold ${change > 0 ? 'text-success' : 'text-error'}`}>
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 to-dark-200 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-accent-100 to-accent-300 bg-clip-text text-transparent">
                  CryptoVision
                </span>
              </h1>
              <p className="text-gray-400">Professional Trading Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-dark-300 rounded-full px-4 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm">Live Market</span>
              </div>
              <div className="bg-dark-300 rounded-full p-2">
                <Shield className="w-5 h-5 text-accent-100" />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Total Portfolio"
            value="$127,845"
            change={12.5}
            color="bg-gradient-to-r from-accent-100 to-accent-300"
          />
          <StatCard
            icon={TrendingUp}
            title="24h P&L"
            value="$3,247"
            change={8.3}
            color="bg-gradient-to-r from-success to-green-600"
          />
          <StatCard
            icon={Activity}
            title="Active Positions"
            value="12"
            change={-2.1}
            color="bg-gradient-to-r from-warning to-orange-600"
          />
          <StatCard
            icon={Users}
            title="Market Cap"
            value="$2.1T"
            change={5.7}
            color="bg-gradient-to-r from-purple-500 to-purple-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-dark-200 glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Price Chart</h2>
              <div className="flex space-x-2">
                {['BTC', 'ETH', 'ADA', 'SOL'].map((crypto) => (
                  <button
                    key={crypto}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCrypto === crypto
                        ? 'bg-accent-100 text-white'
                        : 'bg-dark-300 text-gray-400 hover:bg-dark-400'
                    }`}
                  >
                    {crypto}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#2a2a2a',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedCrypto}
                    stroke="#00d4ff"
                    strokeWidth={2}
                    fill="url(#colorGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-200 glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
              <Zap className="w-5 h-5 text-accent-100" />
            </div>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-accent-100 to-accent-300 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                Buy Crypto
              </button>
              <button className="w-full bg-gradient-to-r from-success to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                Sell Crypto
              </button>
              <button className="w-full bg-gradient-to-r from-warning to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                Set Alert
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                Analyze
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Top Cryptocurrencies</h2>
            <BarChart3 className="w-5 h-5 text-accent-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoData.map((crypto, index) => (
              <motion.div
                key={crypto.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CryptoCard crypto={crypto} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
