import { ScrollProgressBar } from './components/ScrollProgressBar'
import { SectionNav } from './components/SectionNav'
import { Hero } from './chapters/Hero'
import { BusinessPain } from './chapters/BusinessPain'
import { Handoff } from './chapters/Handoff'
import { Discovery } from './chapters/Discovery'
import { Build } from './chapters/Build'
import { Payoff } from './chapters/Payoff'
import { Closing } from './chapters/Closing'

export default function App() {
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
        <Payoff />
        <Closing />
      </main>
    </>
  )
}
