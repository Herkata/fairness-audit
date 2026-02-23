import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const flowSteps = [
  {
    title: 'Implementation Guide',
    description: 'Start here for roles, sequencing, and how the playbook fits together.',
    to: '/docs/implementation-guide',
    type: 'guide',
  },
  {
    title: 'Historical Context Assessment',
    description: 'Map domain history, risks, and protected attributes before design.',
    to: '/docs/historical-context-assessment',
    type: 'tool',
  },
  {
    title: 'Fairness Definition Selection',
    description: 'Choose the right fairness goal and document rationale and trade-offs.',
    to: '/docs/fairness-definition-selection',
    type: 'tool',
  },
  {
    title: 'Bias Source Identification',
    description: 'Trace bias types tied to context and fairness goals; capture evidence.',
    to: '/docs/bias-source-identification',
    type: 'tool',
  },
  {
    title: 'Comprehensive Metrics & Validation',
    description: 'Select metrics, run statistical checks, and set escalation thresholds.',
    to: '/docs/comprehensive-metrics',
    type: 'tool',
  },
  {
    title: 'Reporting & Handoff',
    description: 'Assemble findings, decisions, and mitigations for leadership review.',
    to: '/docs/reporting',
    type: 'report',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('img/katkatu-merleg.svg');
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.brandRow}>
            <img src={logoUrl} alt="Kétkarú mérleg" className={styles.heroLogo} />
            <span className={styles.badge}>Fairness Audit Playbook</span>
          </div>
          <Heading as="h1" className={styles.title}>Fairness Audit Playbook</Heading>
          <p className={styles.subtitle}>{siteConfig.tagline}</p>
          <div className={styles.ctaRow}>
            <Link className={clsx('button', styles.primaryButton)} to="/docs/implementation-guide">
              Get started
            </Link>
            <Link className={clsx('button', styles.ghostButton)} to="/docs/fairness-definition-selection">
              Tools
            </Link>
          </div>
          <div className={styles.metaRow}>
            <span>Bias assessments · Fairness definitions · Risk matrices</span>
          </div>
          <div className={styles.metaLinks}>
            <Link className={styles.metaLink} to="/docs/metric-definition-literature">
              Literature
            </Link>
            <Link className={styles.metaLink} to="/docs/bias-type-literature">
              Sources
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Fairness Audit Playbook"
      description="Fairness Audit Playbook home">
      <HomepageHeader />
      <main className={styles.mainSurface}>
        <div className="container">
          <section className={styles.flowSection} aria-label="Fairness audit playbook flow">
            <div className={styles.flowHeader}>
              <p className={styles.flowBadge}>Audit flow</p>
              <h2 className={styles.flowTitle}>Follow the playbook from kickoff to report</h2>
              <p className={styles.flowSubtitle}>Click a stage to open the tool or guide; arrows show the recommended sequence.</p>
            </div>
            <div className={styles.flowTrack}>
              {flowSteps.map((step, index) => (
                <div key={step.title} className={styles.flowItem}>
                  <Link className={clsx(styles.flowCard, styles[`flowCard-${step.type}`])} to={step.to}>
                    <span className={styles.flowStepNumber}>0{index + 1}</span>
                    <div className={styles.flowCardBody}>
                      <h3 className={styles.flowCardTitle}>{step.title}</h3>
                      <p className={styles.flowCardText}>{step.description}</p>
                    </div>
                  </Link>
                  {index !== flowSteps.length - 1 && (
                    <div className={styles.flowArrow} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </section>
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
