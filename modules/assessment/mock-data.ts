export const DATA = {
  assessmentID: 12456,
  questions: [
    {
      id: 0,
      question: 'What is SEO (Search Engine Optimization) and how does it impact digital marketing strategies?',
      options: [
        {
          id: 1,
          answer:
            'SEO stands for Search Engine Optimization. It involves optimizing websites to rank higher in search engine results, which can improve organic traffic and visibility for businesses.',
        },
        {
          id: 2,
          answer:
            'SEO refers to the process of securing online advertisements on search engines to boost website traffic and conversion rates.',
        },
        {
          id: 3,
          answer:
            'SEO is a social media marketing technique that focuses on optimizing content for maximum engagement on platforms like Facebook and Instagram.',
        },
        {
          id: 4,
          answer: 'SEO is not relevant to digital marketing strategies.',
        },
      ],
      selectedOption: {
        id: 1,
        answer:
          'SEO stands for Search Engine Optimization. It involves optimizing websites to rank higher in search engine results, which can improve organic traffic and visibility for businesses.',
      },
    },
    {
      id: 1,
      question: 'What is the purpose of a landing page in digital marketing campaigns?',
      options: [
        {
          id: 5,
          answer:
            'Landing pages are used to collect information from website visitors, such as their email addresses, in exchange for valuable content or offers.',
        },
        {
          id: 6,
          answer: 'Landing pages are only used for displaying product listings.',
        },
        {
          id: 7,
          answer: 'Landing pages are primarily designed for SEO purposes.',
        },
        {
          id: 8,
          answer: 'Landing pages have no specific purpose in digital marketing campaigns.',
        },
      ],
      selectedOption: {
        id: 5,
        answer:
          'Landing pages are used to collect information from website visitors, such as their email addresses, in exchange for valuable content or offers.',
      },
    },
    {
      id: 2,
      question: 'What is the significance of social media marketing in digital marketing strategies?',
      options: [
        {
          id: 9,
          answer:
            'Social media marketing helps businesses connect with their audience, build brand awareness, and drive traffic and sales through various social platforms.',
        },
        {
          id: 10,
          answer: 'Social media marketing is primarily used for offline advertising.',
        },
        {
          id: 11,
          answer: 'Social media marketing is only relevant for e-commerce businesses.',
        },
        {
          id: 12,
          answer: 'Social media marketing has no impact on digital marketing strategies.',
        },
      ],
      selectedOption: {
        id: 9,
        answer:
          'Social media marketing helps businesses connect with their audience, build brand awareness, and drive traffic and sales through various social platforms.',
      },
    },
    {
      id: 3,
      question: 'What are KPIs (Key Performance Indicators) in digital marketing, and why are they important?',
      options: [
        {
          id: 13,
          answer:
            'KPIs are measurable metrics that help assess the effectiveness of digital marketing efforts, such as website traffic, conversion rates, and ROI (Return on Investment). They are important for tracking and improving campaign performance.',
        },
        {
          id: 14,
          answer: 'KPIs are related to keyword rankings on search engines and have no relevance to digital marketing.',
        },
        {
          id: 15,
          answer: 'KPIs are only relevant for traditional marketing methods.',
        },
        {
          id: 16,
          answer: 'KPIs have no importance in digital marketing.',
        },
      ],
      selectedOption: {
        id: 13,
        answer:
          'KPIs are measurable metrics that help assess the effectiveness of digital marketing efforts, such as website traffic, conversion rates, and ROI (Return on Investment). They are important for tracking and improving campaign performance.',
      },
    },
    {
      id: 4,
      question: 'What is the role of content marketing in digital marketing strategies?',
      options: [
        {
          id: 17,
          answer:
            'Content marketing involves creating and distributing valuable and relevant content to attract and engage a target audience. It plays a crucial role in building brand authority and driving organic traffic.',
        },
        {
          id: 18,
          answer: 'Content marketing is only about creating promotional content for paid advertising campaigns.',
        },
        {
          id: 19,
          answer: 'Content marketing is relevant only for B2B (Business-to-Business) companies.',
        },
        {
          id: 20,
          answer: 'Content marketing has no place in digital marketing strategies.',
        },
      ],
      selectedOption: {
        id: 17,
        answer:
          'Content marketing involves creating and distributing valuable and relevant content to attract and engage a target audience. It plays a crucial role in building brand authority and driving organic traffic.',
      },
    },
    {
      id: 5,
      question: 'What is A/B testing in digital marketing, and why is it valuable?',
      options: [
        {
          id: 21,
          answer:
            'A/B testing involves comparing two versions (A and B) of a web page or marketing material to determine which one performs better in terms of user engagement or conversions. It helps optimize digital marketing campaigns.',
        },
        {
          id: 22,
          answer: 'A/B testing is a term used for analyzing social media engagement metrics.',
        },
        {
          id: 23,
          answer: 'A/B testing is only relevant for email marketing campaigns.',
        },
        {
          id: 24,
          answer: 'A/B testing has no value in digital marketing.',
        },
      ],
      selectedOption: {
        id: 21,
        answer:
          'A/B testing involves comparing two versions (A and B) of a web page or marketing material to determine which one performs better in terms of user engagement or conversions. It helps optimize digital marketing campaigns.',
      },
    },
    {
      id: 6,
      question: 'What is the role of email marketing in nurturing leads and customers?',
      options: [
        {
          id: 25,
          answer:
            'Email marketing is used to send targeted messages and content to leads and customers, nurturing them through the sales funnel and building long-term relationships.',
        },
        {
          id: 26,
          answer: 'Email marketing is only relevant for acquiring new customers.',
        },
        {
          id: 27,
          answer: 'Email marketing is primarily used for offline promotions.',
        },
        {
          id: 28,
          answer: 'Email marketing has no role in digital marketing.',
        },
      ],
      selectedOption: {
        id: 25,
        answer:
          'Email marketing is used to send targeted messages and content to leads and customers, nurturing them through the sales funnel and building long-term relationships.',
      },
    },
    {
      id: 7,
      question: 'What is the concept of PPC (Pay-Per-Click) advertising in digital marketing?',
      options: [
        {
          id: 29,
          answer:
            'PPC advertising is a digital marketing strategy where advertisers pay a fee each time their ad is clicked. It allows businesses to display ads on search engines and websites to drive traffic and conversions.',
        },
        {
          id: 30,
          answer: 'PPC advertising is related to paying for likes on social media posts.',
        },
        {
          id: 31,
          answer: 'PPC advertising is only relevant for e-commerce businesses.',
        },
        {
          id: 32,
          answer: 'PPC advertising has no relevance in digital marketing.',
        },
      ],
      selectedOption: {
        id: 29,
        answer:
          'PPC advertising is a digital marketing strategy where advertisers pay a fee each time their ad is clicked. It allows businesses to display ads on search engines and websites to drive traffic and conversions.',
      },
    },
  ],
};

export type QuestionType = {
  id: number;
  question: string;
  options: OptionType[];
  selectedOption: OptionType;
};

export type OptionType = {
  id: number;
  answer: string;
};
