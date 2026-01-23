'use client'

import { useState } from 'react'
import { Calculator, IndianRupee, TrendingUp, Info, FileText, Download } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/components/ui'
import styles from './page.module.css'

export default function CalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState<'income-tax' | 'gst' | 'tds'>('income-tax')

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tax Calculators</h1>
          <p className={styles.subtitle}>Calculate your taxes with our easy-to-use tools</p>
        </div>

        <div className={styles.gridLayout}>
          <div className={styles.sidebar}>
            <Card>
              <CardContent className={styles.navCard}>
                <nav className={styles.navList}>
                  <button
                    onClick={() => setActiveCalculator('income-tax')}
                    className={`${styles.navButton} ${
                      activeCalculator === 'income-tax'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <Calculator className={styles.navIcon} />
                    <span className={styles.navLabel}>Income Tax</span>
                  </button>
                  <button
                    onClick={() => setActiveCalculator('gst')}
                    className={`${styles.navButton} ${
                      activeCalculator === 'gst'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <IndianRupee className={styles.navIcon} />
                    <span className={styles.navLabel}>GST</span>
                  </button>
                  <button
                    onClick={() => setActiveCalculator('tds')}
                    className={`${styles.navButton} ${
                      activeCalculator === 'tds'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <TrendingUp className={styles.navIcon} />
                    <span className={styles.navLabel}>TDS</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className={styles.mainContent}>
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
    <div className={styles.spacingY6}>
      <Card>
        <CardContent className={styles.calculatorCard}>
          <h2 className={styles.calculatorTitle}>
            <Calculator className={styles.calculatorIcon} />
            Income Tax Calculator (FY 2023-24)
          </h2>

          <div className={styles.formSection}>
            <div>
              <label className={styles.fieldLabel}>Select Tax Regime</label>
              <div className={styles.regimeGrid}>
                <button
                  onClick={() => setRegime('new')}
                  className={`${styles.regimeButton} ${
                    regime === 'new' ? styles.regimeButtonActive : styles.regimeButtonInactive
                  }`}
                >
                  <h3 className={styles.regimeTitle}>New Regime</h3>
                  <p className={styles.regimeDescription}>Lower rates, no deductions</p>
                </button>
                <button
                  onClick={() => setRegime('old')}
                  className={`${styles.regimeButton} ${
                    regime === 'old' ? styles.regimeButtonActive : styles.regimeButtonInactive
                  }`}
                >
                  <h3 className={styles.regimeTitle}>Old Regime</h3>
                  <p className={styles.regimeDescription}>Higher rates, with deductions</p>
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
            <CardContent className={styles.resultsCard}>
              <h3 className={styles.resultsTitle}>Tax Breakdown</h3>
              <div className={styles.resultsContent}>
                <div className={styles.resultGrid}>
                  <div className={`${styles.resultBox} ${styles.resultBoxGray}`}>
                    <p className={`${styles.resultLabel} ${styles.resultLabelGray}`}>Gross Income</p>
                    <p className={`${styles.resultValue} ${styles.resultValueGray}`}>₹{result.grossIncome.toLocaleString()}</p>
                  </div>
                  {regime === 'old' && result.deductions > 0 && (
                    <div className={`${styles.resultBox} ${styles.resultBoxGray}`}>
                      <p className={`${styles.resultLabel} ${styles.resultLabelGray}`}>Deductions</p>
                      <p className={`${styles.resultValue} ${styles.resultValueGreen}`}>- ₹{result.deductions.toLocaleString()}</p>
                    </div>
                  )}
                  <div className={`${styles.resultBox} ${styles.resultBoxGray}`}>
                    <p className={`${styles.resultLabel} ${styles.resultLabelGray}`}>Taxable Income</p>
                    <p className={`${styles.resultValue} ${styles.resultValueGray}`}>₹{result.taxableIncome.toLocaleString()}</p>
                  </div>
                  <div className={`${styles.resultBox} ${styles.resultBoxRed}`}>
                    <p className={`${styles.resultLabel} ${styles.resultLabelRed}`}>Total Tax</p>
                    <p className={`${styles.resultValue} ${styles.resultValueRed}`}>₹{result.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>

                <div className={styles.slabsSection}>
                  <h4 className={styles.slabsTitle}>Tax Slabs Applied:</h4>
                  <div className={styles.slabsList}>
                    {result.slabs.map((slab: any, index: number) => (
                      <div key={index} className={styles.slabItem}>
                        <span className={styles.slabRange}>{slab.range}</span>
                        <div className={styles.slabDetails}>
                          <span className={styles.slabRate}>{slab.rate}</span>
                          <span className={styles.slabAmount}>
                            ₹{slab.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.summarySection}>
                  <div className={`${styles.resultBox} ${styles.resultBoxBlue}`}>
                    <p className={`${styles.resultLabel} ${styles.resultLabelBlue}`}>Effective Tax Rate</p>
                    <p className={`${styles.resultValue} ${styles.resultValueBlue}`}>{result.effectiveRate}%</p>
                  </div>
                  <div className={`${styles.resultBox} ${styles.resultBoxGreenBorder}`}>
                    <p className={`${styles.resultLabel} ${styles.resultLabelGreen}`}>Net Income (After Tax)</p>
                    <p className={`${styles.resultValue} ${styles.resultValueGreen}`}>₹{result.netIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className={styles.infoCard}>
        <CardContent className={styles.infoContent}>
          <Info className={styles.infoIcon} />
          <div className={styles.infoText}>
            <p className={styles.infoTitle}>Note:</p>
            <ul className={styles.infoList}>
              <li>Calculations are based on FY 2023-24 tax slabs</li>
              <li>4% Health & Education Cess is added to the tax amount</li>
              <li>Surcharge not included (applicable for income above ₹50L)</li>
              <li>This is an estimate. Consult a CA for accurate tax planning</li>
            </ul>
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
    <div className={styles.spacingY6}>
      <Card>
        <CardContent className={styles.calculatorCard}>
          <h2 className={styles.calculatorTitle}>
            <IndianRupee className={styles.calculatorIcon} />
            GST Calculator
          </h2>

          <div className={styles.formSection}>
            <div>
              <label className={styles.fieldLabel}>Calculation Mode</label>
              <div className={styles.modeGrid}>
                <button
                  onClick={() => setMode('exclusive')}
                  className={`${styles.modeButton} ${
                    mode === 'exclusive' ? styles.modeButtonActive : styles.modeButtonInactive
                  }`}
                >
                  <h3 className={styles.modeTitle}>GST Exclusive</h3>
                  <p className={styles.modeDescription}>Add GST to amount</p>
                </button>
                <button
                  onClick={() => setMode('inclusive')}
                  className={`${styles.modeButton} ${
                    mode === 'inclusive' ? styles.modeButtonActive : styles.modeButtonInactive
                  }`}
                >
                  <h3 className={styles.modeTitle}>GST Inclusive</h3>
                  <p className={styles.modeDescription}>Extract GST from amount</p>
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
              <label className={styles.fieldLabel}>GST Rate</label>
              <div className={styles.rateGrid}>
                {['5', '12', '18', '28'].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`${styles.rateButton} ${
                      gstRate === rate ? styles.rateButtonActive : styles.rateButtonInactive
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className={styles.rateInput}
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
          <CardContent className={styles.resultsCard}>
            <h3 className={styles.resultsTitle}>GST Breakdown</h3>
            <div className={styles.resultsContent}>
              <div className={styles.resultGrid}>
                <div className={`${styles.resultBox} ${styles.resultBoxGray}`}>
                  <p className={`${styles.resultLabel} ${styles.resultLabelGray}`}>Base Amount</p>
                  <p className={`${styles.resultValue} ${styles.resultValueGray}`}>
                    ₹{result.baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`${styles.resultBox} ${styles.resultBoxBlue}`}>
                  <p className={`${styles.resultLabel} ${styles.resultLabelBlue}`}>Total GST ({result.rate}%)</p>
                  <p className={`${styles.resultValue} ${styles.resultValueBlue}`}>
                    ₹{result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className={styles.gstBreakdownGrid}>
                <div className={`${styles.resultBox} ${styles.resultBoxGreen}`}>
                  <p className={`${styles.resultLabel} ${styles.resultLabelGreen}`}>CGST ({result.rate / 2}%)</p>
                  <p className={`${styles.resultValue} ${styles.resultValueGreen}`}>
                    ₹{result.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`${styles.resultBox} ${styles.resultBoxGreen}`}>
                  <p className={`${styles.resultLabel} ${styles.resultLabelGreen}`}>SGST ({result.rate / 2}%)</p>
                  <p className={`${styles.resultValue} ${styles.resultValueGreen}`}>
                    ₹{result.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className={styles.gstTotal}>
                <p className={styles.gstTotalLabel}>Total Amount (Inc. GST)</p>
                <p className={styles.gstTotalValue}>
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
      <CardContent className={styles.comingSoon}>
        <TrendingUp className={styles.comingSoonIcon} />
        <h3 className={styles.comingSoonTitle}>TDS Calculator</h3>
        <p className={styles.comingSoonText}>Coming Soon</p>
      </CardContent>
    </Card>
  )
}