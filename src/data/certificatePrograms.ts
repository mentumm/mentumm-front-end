export interface Point {
  subTitle: string;
  description: string;
}

export interface Module {
  title: string;
  description: string;
  points: Point[];
  vimeoId: string;
}

export interface CertificateProgram {
  id: number;
  title: string;
  description: string;
  modules: Module[];
  image: string;
}

export const certificatePrograms: CertificateProgram[] = [
  {
    id: 1,
    title: "Leadership",
    description:
      "Learn the basics of digital marketing and how to apply them to your business.",
    modules: [
      {
        vimeoId: "825595386",
        title: "Building Relationships",
        description:
          "Build and maintain strong professional relationships through intentional trust-building, authentic communication, and mutual respect while maintaining appropriate boundaries.",
        points: [
          {
            subTitle: "Prioritize Intentional Relationship Building",
            description:
              "Take deliberate steps to cultivate healthy, meaningful relationships at work and in life. It won't happen by accident.",
          },
          {
            subTitle: "Develop Trust Through Authentic Communication",
            description:
              "Practice open and honest conversations, allowing room for vulnerability and feedback without fear of judgment.",
          },
          {
            subTitle: "Invest Time in Relationship-Building",
            description:
              "Create time in your schedule specifically for connecting with others. Avoid letting day-to-day tasks take over relationship-building efforts.",
          },
          {
            subTitle: "Embrace Mutual Respect and Influence Over Authority",
            description:
              "Lead through influence, not by title, and foster mutual respect within the team to promote trust and collaboration.",
          },
          {
            subTitle: "Adapt Your Leadership Style to Individuals' Needs",
            description:
              "Recognize that everyone communicates and connects differently; tailor your approach to fit their preferences.",
          },
          {
            subTitle: "Show Genuine Appreciation",
            description:
              "Publicly and privately acknowledge team members for their contributions to strengthen morale and relationships.",
          },
          {
            subTitle: "Maintain Professional Boundaries",
            description:
              "Strike a balance between friendliness and professionalism, ensuring boundaries are clear but not stifling.",
          },
          {
            subTitle: "Model Desired Behaviors as a Leader",
            description:
              "Demonstrate the behaviors you expect from others, such as responsibility, follow-through, and positive communication.",
          },
          {
            subTitle: "Avoid Drama and Gossip",
            description:
              "Refrain from engaging in workplace gossip or politics, as these destroy trust and create toxic environments.",
          },
          {
            subTitle: "Continuously Reflect and Adjust",
            description:
              "Regularly assess your relationships and make necessary adjustments to improve dynamics, ensuring you build lasting, positive connections.",
          },
        ],
      },
      {
        vimeoId: "825614275",
        title: "Coaching Conversations",
        description:
          "Conduct effective coaching sessions through regular structured meetings, active listening, and solution-oriented discussions while maintaining accountability and fostering a supportive coaching culture.",
        points: [
          {
            subTitle: "Establish Regular Coaching Sessions",
            description:
              "Set a consistent schedule (e.g., monthly) for coaching sessions to create structure and maintain momentum.",
          },
          {
            subTitle: "Prepare Thoughtful Questions in Advance",
            description:
              "Draft key questions to guide discussions but stay flexible to adapt based on the flow of the conversation.",
          },
          {
            subTitle: "Focus on Active Listening",
            description:
              "Practice listening attentively, allowing your coachee to talk 80% of the time, while asking meaningful follow-up questions.",
          },
          {
            subTitle: "Make Sessions Solution-Oriented",
            description:
              "Shift into solution mode when needed by offering recommendations or collaboratively brainstorming action steps.",
          },
          {
            subTitle: "Create a Safe and Confidential Space",
            description:
              "Hold sessions in an environment where the coachee feels comfortable sharing openly without distractions.",
          },
          {
            subTitle: "Prioritize Root Cause Analysis",
            description:
              "Use probing questions to uncover the real issues behind challenges and opportunities, not just surface-level symptoms.",
          },
          {
            subTitle: "Lean into Prescriptive Guidance When Necessary",
            description:
              "Offer specific recommendations when appropriate, ensuring they align with the coachee's needs and goals.",
          },
          {
            subTitle: "Maintain Accountability",
            description:
              "Follow up on previously agreed-upon action items and ensure progress is being made.",
          },
          {
            subTitle: "Keep Action Items Manageable",
            description:
              "Focus on 1-3 key action items per session to ensure they are achievable and impactful.",
          },
          {
            subTitle: "Cultivate a Coaching Culture",
            description:
              "Encourage peer coaching and create an environment where continuous development and mutual support are embraced.",
          },
        ],
      },
      {
        vimeoId: "825618156",
        title: "Delivering Feedback",
        description:
          "Create a strong feedback culture by providing frequent, specific, and balanced feedback in appropriate settings while maintaining empathy and focusing on solutions.",
        points: [
          {
            subTitle: "Give Feedback Frequently to Build a Feedback Culture",
            description:
              "Deliver feedback regularly to normalize it and avoid surprising team members during critical moments.",
          },
          {
            subTitle: "Offer Feedback in Real-Time When Possible",
            description:
              "Provide feedback as soon as the opportunity arises, such as at the end of meetings or during quick follow-ups.",
          },
          {
            subTitle: "Provide Private, Safe Spaces for Critical Feedback",
            description:
              "Deliver constructive feedback privately to ensure the recipient can focus on the message without external pressure.",
          },
          {
            subTitle: "Be Specific and Avoid Vague Feedback",
            description:
              "Use clear examples to illustrate your points and ensure feedback is actionable and easy to understand.",
          },
          {
            subTitle: "Balance Positive and Constructive Feedback",
            description:
              "Highlight what is working well along with areas for improvement to keep feedback constructive and motivating.",
          },
          {
            subTitle: "Use Empathy in Your Delivery",
            description:
              "Approach feedback with an understanding of the recipient's emotions and provide space for them to process the message.",
          },
          {
            subTitle: "Focus on Solutions and Desired Outcomes",
            description:
              "Keep the feedback conversation solution-oriented and clearly communicate the desired changes.",
          },
          {
            subTitle: "Encourage Two-Way Feedback",
            description:
              "Ask for feedback on your leadership style and create a safe environment where employees can offer suggestions openly.",
          },
          {
            subTitle: "Follow Up to Monitor Progress",
            description:
              "Check in after giving feedback to ensure the changes are being implemented and show you care about the recipient's success.",
          },
          {
            subTitle: "Adapt Feedback Style to Situational Needs",
            description:
              "Tailor the intensity and formality of your feedback based on the specific context and the individual receiving it.",
          },
        ],
      },
      {
        vimeoId: "825624342",
        title: "Driving Engagement",
        description:
          "Foster employee engagement through personalized strategies, meaningful relationships, and continuous development while maintaining proactive communication throughout the employee lifecycle.",
        points: [
          {
            subTitle: "Create Individualized Engagement Strategies",
            description:
              "Recognize that engagement is personal. Develop unique strategies for each team member based on their needs and motivations.",
          },
          {
            subTitle: "Build Strong One-on-One Relationships",
            description:
              "Engage with your team members individually, taking time to understand what they want out of their careers and how they define success.",
          },
          {
            subTitle: "Focus on Employee Life Cycle Stages",
            description:
              "Align your leadership approach with where employees are in the life cycle (attraction, recruitment, onboarding, development, retention, separation).",
          },
          {
            subTitle: "Inspire, Don't Motivate",
            description:
              "Understand that motivation is internal. Your role is to inspire and align employees' work with their personal goals.",
          },
          {
            subTitle: "Maintain a Proactive Engagement Approach",
            description:
              "Don't wait for morale to drop. Continuously nurture engagement to avoid reactive solutions like incentives or pep talks.",
          },
          {
            subTitle: "Use Feedback as a Development Tool",
            description:
              "Establish a culture of two-way feedback, asking employees for their input regularly to improve engagement efforts.",
          },
          {
            subTitle: "Make Work Enjoyable and Meaningful",
            description:
              "Identify ways to bring fun and purpose into work beyond surface-level perks like casual Fridays.",
          },
          {
            subTitle: "Provide Opportunities for Growth",
            description:
              "Support both professional and personal development, understanding that growth contributes to long-term engagement.",
          },
          {
            subTitle: "Check in Regularly to Avoid Attrition",
            description:
              "Don't neglect high-performing employees. Frequent check-ins can prevent disengagement over time.",
          },
          {
            subTitle: "Plan for Employee Separation Thoughtfully",
            description:
              "When employees leave, conduct exit interviews and manage transitions positively to maintain team morale and trust.",
          },
        ],
      },
      {
        vimeoId: "825627382",
        title: "Effective Delegation",
        description:
          "Master delegation by clearly defining ownership, matching tasks to skills, providing necessary resources, and maintaining appropriate oversight while using delegation as a development tool.",
        points: [
          {
            subTitle: "Clearly Define Ownership of Tasks",
            description:
              "Ensure team members understand the task is their responsibility by assigning both authority and accountability.",
          },
          {
            subTitle: "Match Delegation to Skills and Energy Levels",
            description:
              "Assign tasks to individuals based on their strengths, skill sets, and tasks that energize them. Avoid giving draining work to those not suited for it.",
          },
          {
            subTitle: "Provide Sufficient Training and Resources",
            description:
              "Equip your team with the necessary tools and knowledge to handle delegated tasks effectively, especially for recurring responsibilities.",
          },
          {
            subTitle: "Develop a Delegation Culture Built on Trust",
            description:
              "Foster a culture where delegation is embraced as a strategy for efficiency and growth, rather than a burden or sign of laziness.",
          },
          {
            subTitle: "Assess Workload and Bandwidth Continuously",
            description:
              "Regularly check in with employees to understand their workload and make appropriate task allocations based on their current capacity.",
          },
          {
            subTitle: "Encourage Two-Way Communication",
            description:
              "Maintain open communication during the delegation process to address challenges early, ensuring tasks are completed smoothly.",
          },
          {
            subTitle: "Focus on Results, Not Processes",
            description:
              "Allow employees to use their own methods to achieve goals, as long as the desired outcomes are met. Avoid micromanaging.",
          },
          {
            subTitle: "Follow Up and Monitor Progress Without Micromanaging",
            description:
              "Schedule periodic check-ins to track progress, avoiding last-minute surprises or task failures.",
          },
          {
            subTitle: "Use Delegation as a Development Tool",
            description:
              "Delegate tasks that offer learning opportunities to employees, promoting cross-training and growth within the team.",
          },
          {
            subTitle: "Recognize and Reward Success",
            description:
              "Acknowledge and celebrate successful task completion, both privately and publicly, to encourage future engagement and motivation.",
          },
        ],
      },
      {
        vimeoId: "825632299",
        title: "Emotional Intelligence",
        description:
          "Develop emotional intelligence through self-awareness, emotional regulation, empathy, and effective relationship management while modeling desired behaviors.",
        points: [
          {
            subTitle: "Prioritize Self-Awareness",
            description:
              "Reflect regularly on your emotions, strengths, and weaknesses, and understand how they affect your behavior and relationships.",
          },
          {
            subTitle: "Practice Emotional Regulation",
            description:
              "Develop techniques such as breathing exercises or taking breaks to manage impulses and respond thoughtfully, not reactively.",
          },
          {
            subTitle: "Foster Empathy in Conversations",
            description:
              "Make a conscious effort to understand others' emotions and perspectives by asking thoughtful questions and actively listening.",
          },
          {
            subTitle: "Adapt Your Leadership Style to Individuals",
            description:
              "Tailor your interactions based on the unique needs and preferences of each team member to build rapport and trust.",
          },
          {
            subTitle: "Lead by Influence, Not Title",
            description:
              "Inspire others through your actions and values rather than relying on your formal authority or position.",
          },
          {
            subTitle: "Use Constructive Feedback to Build Trust",
            description:
              "Provide honest but empathetic feedback and seek input from others to strengthen relationships and foster growth.",
          },
          {
            subTitle: "Identify Emotional Triggers and Learn from Them",
            description:
              "Recognize situations that provoke emotional responses and use them as opportunities for self-improvement.",
          },
          {
            subTitle: "Encourage Two-Way Communication",
            description:
              "Create a safe environment where both you and your team members feel comfortable sharing thoughts and feedback.",
          },
          {
            subTitle: "Manage Conflict Effectively and Quickly",
            description:
              "Address conflicts early before they escalate, using empathy and open dialogue to resolve issues constructively.",
          },
          {
            subTitle: "Model the Behavior You Expect from Others",
            description:
              "Demonstrate the qualities you want to see in your team, such as calmness under pressure, responsiveness, and collaboration.",
          },
        ],
      },
      {
        vimeoId: "825647817",
        title: "Managing Change",
        description:
          "Guide teams through change by acknowledging its inevitability, communicating benefits clearly, providing emotional support, and addressing resistance proactively.",
        points: [
          {
            subTitle: "Assess Your Relationship with Change",
            description:
              "Reflect on how you've handled change in the past and identify patterns in your reactions to improve future adaptability.",
          },
          {
            subTitle: "Acknowledge That Change is Inevitable",
            description:
              "Help your team understand that change is a constant part of life and work, so it's essential to approach it proactively.",
          },
          {
            subTitle: "Communicate the Benefits of Change Clearly",
            description:
              "Focus discussions on what team members will gain from the change (e.g., efficiency, financial benefits) to increase buy-in.",
          },
          {
            subTitle: "Provide Opportunities for Emotional Venting",
            description:
              "Create space for individuals to express their frustrations, concerns, and feelings without judgment to foster acceptance.",
          },
          {
            subTitle: "Conduct Individual Conversations with Each Team Member",
            description:
              "Ensure you meet with team members individually to address their personal reactions and concerns regarding the change.",
          },
          {
            subTitle: "Be an Early Adopter and Model the Change",
            description:
              "Demonstrate the desired behavior by embracing the change early and leading by example.",
          },
          {
            subTitle: "Support Team Members Through Transition Phases",
            description:
              "Recognize that some individuals may respond to change slowly and require additional guidance or time to adjust.",
          },
          {
            subTitle: "Validate Emotions, but Focus on Forward Movement",
            description:
              "Acknowledge feelings while shifting the conversation towards actionable steps to embrace the change.",
          },
          {
            subTitle: "Develop Simple Change Messaging Frameworks",
            description:
              "Use clear, concise messaging with 3-5 key points about the change to ensure alignment and understanding.",
          },
          {
            subTitle: "Run Towards Resistance, Not Away",
            description:
              "Address concerns directly and early to avoid misunderstandings and build trust within the team.",
          },
        ],
      },
      {
        vimeoId: "825649270",
        title: "Managing Performance",
        description:
          "Drive performance through clear goal-setting, continuous monitoring, objective metrics, and regular feedback while fostering accountability and development.",
        points: [
          {
            subTitle: "Set SMART Goals Aligned with Organizational Objectives",
            description:
              "Establish clear, measurable goals for each team member to ensure alignment with your team and organization's overall strategy.",
          },
          {
            subTitle: "Monitor Performance Continuously",
            description:
              "Conduct regular performance check-ins (monthly or quarterly) to track progress, identify issues early, and avoid surprises during annual reviews.",
          },
          {
            subTitle: "Use Objective Metrics to Measure Success",
            description:
              "Implement quantitative benchmarks, such as KPIs or OKRs, to evaluate individual and team performance without ambiguity.",
          },
          {
            subTitle: "Foster a Culture of Accountability",
            description:
              "Communicate expectations clearly, hold employees accountable to their goals, and provide feedback on both successes and areas for improvement.",
          },
          {
            subTitle: "Incorporate Real-Time Feedback for Rapid Improvement",
            description:
              "Offer ongoing feedback throughout the year to enable employees to self-correct and improve without waiting for formal reviews.",
          },
          {
            subTitle: "Differentiate High Performers from Low Performers",
            description:
              "Identify top contributors through consistent metrics and celebrate their achievements to inspire others in the organization.",
          },
          {
            subTitle: "Document Performance Conversations",
            description:
              "Maintain records of feedback and performance discussions to ensure transparency and track improvements over time.",
          },
          {
            subTitle: "Coordinate with HR on Performance Standards",
            description:
              "Align your team's performance management practices with HR protocols to ensure consistency and support from leadership.",
          },
          {
            subTitle: "Create Structured, Meaningful Reviews",
            description:
              "Prepare formal performance reviews with specific agendas, actionable takeaways, and a focus on employee development.",
          },
          {
            subTitle: "Encourage Self-Management",
            description:
              "Empower employees to track their own performance and make adjustments proactively, fostering independence and growth.",
          },
        ],
      },
      {
        vimeoId: "825651917",
        title: "Managing Priorities",
        description:
          "Optimize productivity by identifying high-impact tasks, using effective time management techniques, and establishing clear boundaries while maintaining work-life balance.",
        points: [
          {
            subTitle: "Identify and Focus on High-Impact Tasks",
            description:
              "Prioritize tasks that align with your goals and have the most significant impact on results, avoiding unnecessary busy work.",
          },
          {
            subTitle: "Use the Four Quadrants of Priority Management",
            description:
              "Categorize tasks as urgent/important, important/not urgent, urgent/not important (delegate), or not urgent/not important (eliminate).",
          },
          {
            subTitle: "Time Block for Key Tasks",
            description:
              "Allocate dedicated time blocks for your most important tasks to maintain focus and avoid distractions.",
          },
          {
            subTitle: "Plan Ahead to Reduce Stress",
            description:
              "Organize your week in advance, ideally on Friday or Sunday, to ensure you hit the ground running with a clear plan.",
          },
          {
            subTitle: "Avoid Procrastination by Addressing Priorities First",
            description:
              "Tackle essential tasks early in the day when energy and focus are highest to prevent delays.",
          },
          {
            subTitle: "Establish Boundaries for Availability",
            description:
              "Set clear boundaries with your team to avoid being overwhelmed by constant interruptions and non-urgent requests.",
          },
          {
            subTitle: "Eliminate or Delegate Low-Value Tasks",
            description:
              "Regularly audit your calendar and to-do list, removing or assigning low-priority tasks to free up time.",
          },
          {
            subTitle: "Take Natural Breaks for Sustained Productivity",
            description:
              "Incorporate breaks between tasks or meetings to maintain mental clarity and prevent burnout.",
          },
          {
            subTitle: "Align Your Calendar with Your Energy Levels",
            description:
              "Schedule tasks that require creativity or focus during your peak energy periods, and routine work during low-energy times.",
          },
          {
            subTitle: "Teach Priority Management to Your Team",
            description:
              "Share your strategies with your team to foster a culture of productivity and empower them to manage their tasks effectively.",
          },
        ],
      },
      {
        vimeoId: "825656128",
        title: "Resolving Conflict",
        description:
          "Address conflicts effectively by intervening early, maintaining neutrality, facilitating open communication, and focusing on collaborative solutions while documenting agreements.",
        points: [
          {
            subTitle: "Address Conflict Early to Prevent Escalation",
            description:
              "Don't ignore conflicts; tackle them as soon as they arise to avoid trust erosion and larger issues down the road.",
          },
          {
            subTitle: "Separate the Conflict from Personalities",
            description:
              'Focus on the issue at hand rather than making it about people. Avoid labeling parties as "good" or "bad."',
          },
          {
            subTitle: "Create a Safe Space for Open Communication",
            description:
              "Facilitate discussions where all parties feel comfortable expressing their perspectives without fear of judgment.",
          },
          {
            subTitle: "Encourage Collaborative Solutions",
            description:
              "Use a collaborative approach to find solutions that everyone can agree on, promoting long-term resolution.",
          },
          {
            subTitle:
              'Avoid Lazy Leadership Tactics like "Splitting the Difference"',
            description:
              "Instead of compromising without addressing the root cause, invest time in finding sustainable solutions.",
          },
          {
            subTitle: "Use Active Listening to Identify Underlying Issues",
            description:
              "Listen not just to the words but also to the emotions and meanings behind what's being said to uncover deeper concerns.",
          },
          {
            subTitle: "Maintain Emotional Neutrality",
            description:
              "Stay calm and neutral as a leader to ensure that emotions do not cloud the resolution process.",
          },
          {
            subTitle: "Document Agreements Clearly and Share with All Parties",
            description:
              "Recap the resolutions and agreed-upon next steps to prevent misunderstandings and hold everyone accountable.",
          },
          {
            subTitle: "Follow Up and Monitor Progress",
            description:
              "Check in regularly to ensure the resolution is working and address any new issues early.",
          },
          {
            subTitle: "Train Team Members in Conflict Resolution",
            description:
              "Encourage employees to resolve conflicts on their own using these strategies, reducing dependency on management intervention.",
          },
        ],
      },
      {
        vimeoId: "825658285",
        title: "Setting Goals",
        description:
          "Create effective goals through SMART criteria, individual alignment, and regular monitoring while celebrating progress and maintaining flexibility.",
        points: [
          {
            subTitle: "Establish SMART Goals",
            description:
              "Ensure all goals are Specific, Measurable, Attainable, Relevant, and Time-bound to provide clarity and focus.",
          },
          {
            subTitle: "Align Goals with Individual Motivations",
            description:
              "Understand what personally motivates each team member and align their goals with those motivations to encourage buy-in.",
          },
          {
            subTitle: "Break Down Long-Term Goals into Near-Term Milestones",
            description:
              'Use "near stars" (30, 60, 90-day goals) to build momentum toward larger "North Star" objectives, ensuring progress stays on track.',
          },
          {
            subTitle: "Involve Team Members in the Goal-Setting Process",
            description:
              "Collaborate with individuals to develop their goals, fostering ownership and a partnership mentality.",
          },
          {
            subTitle: "Communicate Progress with Visible Scoreboards",
            description:
              "Create transparent ways to track performance, such as dashboards or spreadsheets, and make progress visible to the entire team.",
          },
          {
            subTitle: "Focus on Lead Measures, Not Just Outcomes",
            description:
              "Identify key activities (like meetings, calls, or outreach) that drive results to monitor progress and avoid waiting for end-of-period outcomes.",
          },
          {
            subTitle: "Set Realistic, Data-Driven Goals",
            description:
              "Use relevant data and trends to establish achievable goals, preventing burnout and disengagement caused by unattainable targets.",
          },
          {
            subTitle: "Conduct Weekly Check-Ins to Maintain Accountability",
            description:
              "Schedule short, frequent meetings to review progress, adjust tasks, and ensure alignment throughout the process.",
          },
          {
            subTitle: "Adjust and Reset Goals When Necessary",
            description:
              "Be willing to pivot or adjust goals based on new data or circumstances, ensuring continuous improvement and progress.",
          },
          {
            subTitle: "Celebrate Small Wins to Build Momentum",
            description:
              "Recognize achievements, no matter how small, to sustain motivation and create positive reinforcement.",
          },
        ],
      },
      {
        title: "Team Execution",
        vimeoId: "825661979",
        description:
          "Drive team success through strategic alignment, clear roles, frequent communication, and proactive problem-solving while maintaining a balance between execution and innovation.",
        points: [
          {
            subTitle: "Foster Strategic Alignment Across the Team",
            description:
              "Ensure every team member understands how their role aligns with the organization's strategic goals, promoting shared purpose.",
          },
          {
            subTitle: "Embrace the Whole-Team Execution Model",
            description:
              "Involve the entire team in key initiatives rather than using siloed or lone-wolf approaches, maximizing collaboration and results.",
          },
          {
            subTitle: "Communicate Frequently and Transparently",
            description:
              "Over-communicate goals, progress, and expectations to build trust and engagement within the team.",
          },
          {
            subTitle: "Assign Clear Roles and Responsibilities",
            description:
              "Ensure every team member knows their specific duties and how they contribute to the team's overall success.",
          },
          {
            subTitle: "Implement Weekly Check-Ins to Monitor Progress",
            description:
              "Use weekly meetings to review performance, address challenges, and maintain accountability.",
          },
          {
            subTitle: "Measure Success with Lead Metrics",
            description:
              "Focus on predictive metrics (like tasks completed) to monitor progress in real time rather than waiting for lagging indicators.",
          },
          {
            subTitle: "Create a Safe Environment for Innovation",
            description:
              "Balance execution with creativity by encouraging innovative solutions without compromising essential goals.",
          },
          {
            subTitle: "Proactively Address Challenges and Bottlenecks",
            description:
              "Identify and address obstacles early to maintain momentum and prevent delays.",
          },
          {
            subTitle: "Celebrate Wins, Both Big and Small",
            description:
              "Acknowledge individual and team accomplishments to foster motivation and reinforce positive behaviors.",
          },
          {
            subTitle: "Commit to Continuous Improvement",
            description:
              "Regularly assess and refine processes to adapt to new challenges, keeping the team agile and high-performing.",
          },
        ],
      },
    ],
    image: "https://via.placeholder.com/300",
  },
];
