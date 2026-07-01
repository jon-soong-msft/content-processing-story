import { ScrollProgressBar } from './components/ScrollProgressBar'
import { SectionNav } from './components/SectionNav'
import { Hero } from './chapters/Hero'
import { BusinessPain } from './chapters/BusinessPain'
import { Handoff } from './chapters/Handoff'
import { Discovery } from './chapters/Discovery'
import { Build } from './chapters/Build'
import { RealRun } from './chapters/RealRun'
import { Payoff } from './chapters/Payoff'
import { Closing } from './chapters/Closing'
import { Catalog } from './chapters/Catalog'
import { useKeyboardNav } from './hooks/useKeyboardNav'

export default function App() {
  useKeyboardNav()

  return (
    <>
      <ScrollProgressBar />
      <SectionNav />
      <main className="relative">
        <Hero />
        <BusinessPain />
        <Handoff />
        <Discovery />
        <Build />
        <RealRun />
        <Payoff />
        <Closing />
        <Catalog />
      </main>
    </>
  )
}
