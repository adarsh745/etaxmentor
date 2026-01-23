'use client'

import { useState } from 'react'
import { Calculator, IndianRupee, TrendingUp, Info, FileText, Download } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/components/ui'

export default function CalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState<'income-tax' | 'gst' | 'tds'>('income-tax')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Calculators</h1>
          <p className="text-gray-600">Calculate your taxes with our easy-to-use tools</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveCalculator('income-tax')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCalculator === 'income-tax'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calculator className="w-5 h-5" />
                    <span className="font-medium">Income Tax</span>
                  </button>
                  <button
                    onClick={() => setActiveCalculator('gst')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCalculator === 'gst'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IndianRupee className="w-5 h-5" />
                    <span className="font-medium">GST</span>
                  </button>
                  <button
                    onClick={() => setActiveCalculator('tds')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCalculator === 'tds'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-medium">TDS</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeCalculator === 'income-tax' && <IncomeTaxCalculator />}
            {activeCalculator === 'gst' && <GSTCalculator />}
            {activeCalculator === 'tds' && <TDSCalculator />}
          </div>
        </div>
      </div>
    </div>
  )
}

function IncomeTaxCalculator() {
  const [income, setIncome] = useState('')
  const [regime, setRegime] = useState<'old' | 'new'>('new')
  const [deductions, setDeductions] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0
    const totalDeductions = regime === 'old' ? (parseFloat(deductions) || 0) : 0
    const taxableIncome = Math.max(grossIncome - totalDeductions, 0)

    let tax = 0
    let slabs: any[] = []

    if (regime === 'new') {
      // New Tax Regime FY 2023-24
      if (taxableIncome <= 300000) {
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
      } else if (taxableIncome <= 600000) {
        const taxable = taxableIncome - 300000
        tax = taxable * 0.05
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
        slabs.push({ range: '3L - 6L', rate: '5%', amount: tax })
      } else if (taxableIncome <= 900000) {
        const taxable = taxableIncome - 600000
        tax = 15000 + taxable * 0.10
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
        slabs.push({ range: '3L - 6L', rate: '5%', amount: 15000 })
        slabs.push({ range: '6L - 9L', rate: '10%', amount: taxable * 0.10 })
      } else if (taxableIncome <= 1200000) {
        const taxable = taxableIncome - 900000
        tax = 45000 + taxable * 0.15
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
        slabs.push({ range: '3L - 6L', rate: '5%', amount: 15000 })
        slabs.push({ range: '6L - 9L', rate: '10%', amount: 30000 })
        slabs.push({ range: '9L - 12L', rate: '15%', amount: taxable * 0.15 })
      } else if (taxableIncome <= 1500000) {
        const taxable = taxableIncome - 1200000
        tax = 90000 + taxable * 0.20
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
        slabs.push({ range: '3L - 6L', rate: '5%', amount: 15000 })
        slabs.push({ range: '6L - 9L', rate: '10%', amount: 30000 })
        slabs.push({ range: '9L - 12L', rate: '15%', amount: 45000 })
        slabs.push({ range: '12L - 15L', rate: '20%', amount: taxable * 0.20 })
      } else {
        const taxable = taxableIncome - 1500000
        tax = 150000 + taxable * 0.30
        slabs.push({ range: '0 - 3L', rate: '0%', amount: 0 })
        slabs.push({ range: '3L - 6L', rate: '5%', amount: 15000 })
        slabs.push({ range: '6L - 9L', rate: '10%', amount: 30000 })
        slabs.push({ range: '9L - 12L', rate: '15%', amount: 45000 })
        slabs.push({ range: '12L - 15L', rate: '20%', amount: 60000 })
        slabs.push({ range: 'Above 15L', rate: '30%', amount: taxable * 0.30 })
      }
    } else {
      // Old Tax Regime
      if (taxableIncome <= 250000) {
        slabs.push({ range: '0 - 2.5L', rate: '0%', amount: 0 })
      } else if (taxableIncome <= 500000) {
        const taxable = taxableIncome - 250000
        tax = taxable * 0.05
        slabs.push({ range: '0 - 2.5L', rate: '0%', amount: 0 })
        slabs.push({ range: '2.5L - 5L', rate: '5%', amount: tax })
      } else if (taxableIncome <= 1000000) {
        const taxable = taxableIncome - 500000
        tax = 12500 + taxable * 0.20
        slabs.push({ range: '0 - 2.5L', rate: '0%', amount: 0 })
        slabs.push({ range: '2.5L - 5L', rate: '5%', amount: 12500 })
        slabs.push({ range: '5L - 10L', rate: '20%', amount: taxable * 0.20 })
      } else {
        const taxable = taxableIncome - 1000000
        tax = 112500 + taxable * 0.30
        slabs.push({ range: '0 - 2.5L', rate: '0%', amount: 0 })
        slabs.push({ range: '2.5L - 5L', rate: '5%', amount: 12500 })
        slabs.push({ range: '5L - 10L', rate: '20%', amount: 100000 })
        slabs.push({ range: 'Above 10L', rate: '30%', amount: taxable * 0.30 })
      }
    }

    const cess = tax * 0.04
    const totalTax = tax + cess
    const netIncome = grossIncome - totalTax

    setResult({
      grossIncome,
      deductions: totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      netIncome,
      effectiveRate: grossIncome > 0 ? (totalTax / grossIncome * 100).toFixed(2) : 0,
      slabs,
    })
  }

  return (
    <div className="space-y-16">
      <Card>
        <CardContent className="p-12 bg-green-50 ">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#1E3A8A]" />
            Income Tax Calculator (FY 2023-24)
          </h2>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Tax Regime</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRegime('new')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    regime === 'new'
                      ? 'border-[#1E3A8A] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">New Regime</h3>
                  <p className="text-sm text-gray-600">Lower rates, no deductions</p>
                </button>
                <button
                  onClick={() => setRegime('old')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    regime === 'old'
                      ? 'border-[#1E3A8A] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Old Regime</h3>
                  <p className="text-sm text-gray-600">Higher rates, with deductions</p>
                </button>
              </div>
            </div>

            <Input
              label="Gross Annual Income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0"
              prefix="₹"
            />

            {regime === 'old' && (
              <Input
                label="Total Deductions (80C, 80D, etc.)"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                placeholder="0"
                prefix="₹"
                helperText="Includes 80C (₹1.5L), 80D, HRA, etc."
              />
            )}

            <Button onClick={calculateTax} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Tax
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Gross Income</p>
                    <p className="text-2xl font-bold text-gray-900">₹{result.grossIncome.toLocaleString()}</p>
                  </div>
                  {regime === 'old' && result.deductions > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Deductions</p>
                      <p className="text-2xl font-bold text-green-600">- ₹{result.deductions.toLocaleString()}</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Taxable Income</p>
                    <p className="text-2xl font-bold text-gray-900">₹{result.taxableIncome.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 mb-1">Total Tax</p>
                    <p className="text-2xl font-bold text-red-600">₹{result.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">Tax Slabs Applied:</h4>
                  <div className="space-y-2">
                    {result.slabs.map((slab: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{slab.range}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900">{slab.rate}</span>
                          <span className="text-sm font-semibold text-[#1E3A8A]">
                            ₹{slab.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Effective Tax Rate</p>
                    <p className="text-xl font-bold text-blue-700">{result.effectiveRate}%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 mb-1">Net Income (After Tax)</p>
                    <p className="text-xl font-bold text-green-700">₹{result.netIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Note:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Calculations are based on FY 2023-24 tax slabs</li>
                <li>4% Health & Education Cess is added to the tax amount</li>
                <li>Surcharge not included (applicable for income above ₹50L)</li>
                <li>This is an estimate. Consult a CA for accurate tax planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GSTCalculator() {
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [result, setResult] = useState<any>(null)

  const calculateGST = () => {
    const base = parseFloat(amount) || 0
    const rate = parseFloat(gstRate) || 0

    let gstAmount, totalAmount, baseAmount

    if (mode === 'exclusive') {
      baseAmount = base
      gstAmount = (base * rate) / 100
      totalAmount = base + gstAmount
    } else {
      totalAmount = base
      baseAmount = base / (1 + rate / 100)
      gstAmount = base - baseAmount
    }

    const cgst = gstAmount / 2
    const sgst = gstAmount / 2

    setResult({
      baseAmount,
      gstAmount,
      cgst,
      sgst,
      totalAmount,
      rate,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-[#1E3A8A]" />
            GST Calculator
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('exclusive')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    mode === 'exclusive'
                      ? 'border-[#1E3A8A] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">GST Exclusive</h3>
                  <p className="text-sm text-gray-600">Add GST to amount</p>
                </button>
                <button
                  onClick={() => setMode('inclusive')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    mode === 'inclusive'
                      ? 'border-[#1E3A8A] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">GST Inclusive</h3>
                  <p className="text-sm text-gray-600">Extract GST from amount</p>
                </button>
              </div>
            </div>

            <Input
              label={mode === 'exclusive' ? 'Base Amount' : 'Total Amount (with GST)'}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              prefix="₹"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate</label>
              <div className="grid grid-cols-5 gap-2">
                {['5', '12', '18', '28'].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      gstRate === rate
                        ? 'bg-[#1E3A8A] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="py-3 px-4 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                  placeholder="%"
                />
              </div>
            </div>

            <Button onClick={calculateGST} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate GST
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">GST Breakdown</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Base Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{result.baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 mb-1">Total GST ({result.rate}%)</p>
                  <p className="text-2xl font-bold text-blue-700">
                    ₹{result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">CGST ({result.rate / 2}%)</p>
                  <p className="text-xl font-bold text-green-700">
                    ₹{result.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">SGST ({result.rate / 2}%)</p>
                  <p className="text-xl font-bold text-green-700">
                    ₹{result.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg text-white">
                <p className="text-sm opacity-90 mb-1">Total Amount (Inc. GST)</p>
                <p className="text-3xl font-bold">
                  ₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function TDSCalculator() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">TDS Calculator</h3>
        <p className="text-gray-500">Coming Soon</p>
      </CardContent>
    </Card>
  )
}
