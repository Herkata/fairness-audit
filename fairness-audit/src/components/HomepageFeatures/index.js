import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Bias source assessment',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Map historical patterns and system relevance with structured, repeatable checklists.
      </>
    ),
  },
  {
    title: 'Fairness definition selection',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Choose parity, opportunity, or calibration goals with guided decision trees tailored to your context.
      </>
    ),
  },
  {
    title: 'Audit-ready reports',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Generate fillable matrices and tables that capture mitigations, owners, and monitoring plans.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={styles.featureCard}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
    </section>
  );
}
