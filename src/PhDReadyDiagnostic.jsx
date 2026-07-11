import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Download, Mail, RotateCcw, Check } from 'lucide-react';

const BRAND = {
  teal: '#2d5560',
  tealMid: '#3a6975',
  tealLight: '#e8eef0',
  gold: '#b8945c',
  goldLight: '#faf7f1',
  text: '#1f2d35',
  textMuted: '#5a6b73',
  rule: '#c8d2d6',
  white: '#ffffff',
};

const SECTIONS = [
  {
    id: 1,
    title: "Do You Know What You're Actually Applying For?",
    intro: "The most common reason strong applicants lose ground before a committee even reads their statement has nothing to do with their GPA or their research experience. It's that they're applying to a PhD program the way they applied to college. A committee can tell. Work through these questions based on where you actually are right now.",
    dimension: "Program Understanding",
    questions: [
      {
        stem: "I can describe the difference between a PhD program and a master's program in my field without looking it up.",
        explain: "This isn't about definitions. It's about whether you understand that a PhD is a research apprenticeship, not an advanced degree you complete by taking courses."
      },
      {
        stem: "I know what students in my target programs are expected to produce by the end of their second year.",
        explain: "Qualifying exams, literature reviews, prospectus drafts. If you don't know what your target programs expect at the two-year mark, you don't yet know what you're signing up for."
      },
      {
        stem: "I can describe the specific intellectual problem I want to spend the next five years working on.",
        explain: "Not your general area of interest. The open question you want to investigate, why it matters, and why it hasn't been answered yet."
      },
      {
        stem: "I understand what it means to be funded by a PhD program and what obligations typically come with that funding.",
        explain: "Funding in most doctoral programs comes with teaching or research assistantships. These are not optional."
      },
      {
        stem: "I have spoken with at least one current PhD student in a program I'm targeting within the last six months.",
        explain: "A current student can tell you what the program is like right now, the advising culture, the funding reliability, the unwritten expectations."
      }
    ],
    reflection: "Write 2 to 3 sentences describing the research problem you want to pursue in your PhD program. Not your field. The specific problem, what you want to understand, why it matters. If you find yourself writing in general terms, that's the gap."
  },
  {
    id: 2,
    title: "Is Your Statement of Purpose Making an Argument?",
    intro: "The statement of purpose is the part of the application most applicants spend the most time on, and the part most likely to work against them. A committee is doing a job. They are evaluating whether you understand a problem worth investigating, whether you have the foundation to investigate it, and whether this program is the right place to do that work. Most statements don't help them do that job.",
    dimension: "Statement Legibility",
    questions: [
      {
        stem: "My statement opens with the research problem I want to solve, not with a story about myself.",
        explain: "Personal narratives have a place in a statement of purpose, but they are not the opening move. A committee reading fifty applications in a week notices this immediately."
      },
      {
        stem: "I can point to a specific sentence in my statement that explains why the problem I'm investigating matters to the field.",
        explain: "You need to locate your topic within a larger conversation. If that sentence doesn't exist, the intellectual stakes of your work are invisible."
      },
      {
        stem: "My statement demonstrates awareness of current debates or open questions in my area.",
        explain: "This doesn't mean a literature review. It means showing that you know where the field is right now, what's contested, what's unresolved."
      },
      {
        stem: "My statement is written specifically for each program I'm applying to.",
        explain: "A generic statement is one of the clearest signs that an applicant doesn't understand what fit means in doctoral admissions."
      },
      {
        stem: "A faculty member in my target program could read my statement and recognize a clear connection to their current research.",
        explain: "Not their most cited paper. Their current work. A faculty member can tell in thirty seconds whether an applicant has read their recent work or just their Wikipedia entry."
      }
    ],
    reflection: "Read the first paragraph of your current statement, or write one right now. What does this paragraph tell a committee about the intellectual problem you want to solve? If the answer is 'not much' or 'it mostly tells them about me,' that's your gap."
  },
  {
    id: 3,
    title: "Are You Signaling Fit or Just Naming Faculty?",
    intro: "Every guide to PhD applications tells you to research faculty and mention them. So applicants do. They find three names, list their most well-known work, and write a sentence about why they'd love to work with them. Committees see through this immediately. Naming faculty is not the same as demonstrating fit. One is a search result. The other is evidence.",
    dimension: "Fit Signaling",
    questions: [
      {
        stem: "I have read at least two publications from each faculty member I plan to name, published within the last three years.",
        explain: "Not their most cited work. Their recent work, what they're thinking about now."
      },
      {
        stem: "I can explain specifically how my research interests connect to each faculty member's current work, not their reputation.",
        explain: "'I'm interested in Dr. X's groundbreaking work in Y' is not a connection. It's a compliment."
      },
      {
        stem: "I know whether the faculty members I plan to name are currently accepting students.",
        explain: "Faculty go on sabbatical. They stop taking students when their lab is full. This is a five-minute check that most applicants don't make."
      },
      {
        stem: "I have made contact with at least one faculty member before applying, focused on their research and not on my candidacy.",
        explain: "Done well, a short, specific message about a genuine point of intersection can establish name recognition that matters when your file comes up in committee."
      },
      {
        stem: "My application mentions faculty in a way that demonstrates engagement with their ideas, not just awareness of their existence.",
        explain: "Read the sentences where you name faculty. Remove the names. Do those sentences still say something substantive? If not, the sentences aren't doing what you think they're doing."
      }
    ],
    reflection: "Pick one faculty member you plan to name. Without looking anything up, write 3 sentences connecting their current research agenda to yours, what specifically in their recent work intersects with the problem you want to investigate. If you're writing in general terms, you're not there yet."
  },
  {
    id: 4,
    title: "Does Your Profile Translate Into Doctoral Readiness?",
    intro: "Most applicants with strong academic records assume their profile speaks for itself. It doesn't. A high GPA and a list of research experiences are not the same as doctoral readiness. They're inputs. What a committee evaluates is whether you can translate those inputs into evidence of something harder to teach: the ability to think independently, tolerate ambiguity, and produce original intellectual work.",
    dimension: "Doctoral Readiness",
    questions: [
      {
        stem: "I can describe a specific experience where I worked on an open-ended problem, one without a predetermined answer or a rubric to follow.",
        explain: "Coursework doesn't count. Neither does a research assistantship where you were handed a protocol and executed it."
      },
      {
        stem: "My application shows evidence of independent thinking, not just strong performance.",
        explain: "School rewards mastery of existing knowledge. A PhD requires you to generate new knowledge."
      },
      {
        stem: "I can articulate what I contributed intellectually to my research experience, not just what I did logistically.",
        explain: "'I collected data, ran analyses, assisted with manuscript preparation' is a job description. Find the intellectual core of your experience."
      },
      {
        stem: "My recommenders know specifically what I need them to speak to in their letters.",
        explain: "A letter of recommendation is not a character reference. It is evidence. Your recommenders need to know what gaps they're filling."
      },
      {
        stem: "If there is anything in my profile that needs explaining, I have addressed it directly rather than hoping it goes unnoticed.",
        explain: "Committees notice. A GPA dip, a missing semester, a sharp pivot. Ignoring them leaves a committee filling in the blanks, and they will rarely fill them in your favor."
      }
    ],
    reflection: "In three sentences, describe the strongest piece of evidence in your application for doctoral readiness, as if writing to a committee member who has never met you. If the committee member would have to ask follow-up questions to understand why this evidence matters, that's your gap."
  }
];

const SCORE_VALUES = { yes: 1, mostly: 0.5, no: 0 };

export default function PhDReadyDiagnostic() {
  const [screen, setScreen] = useState('welcome'); // welcome, section, results
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reflections, setReflections] = useState({});
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState('');
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('phd-ready-progress');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers && Object.keys(data.answers).length > 0) {
          setSavedProgress(data);
        }
      }
    } catch (e) {
      // No saved progress, fine
    }
  }, []);

  // Save progress whenever answers or reflections change
  useEffect(() => {
    if (Object.keys(answers).length === 0 && Object.keys(reflections).length === 0) return;
    try {
      localStorage.setItem('phd-ready-progress', JSON.stringify({
        answers,
        reflections,
        currentSection,
        screen,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      // Storage failed, continue anyway
    }
  }, [answers, reflections, currentSection, screen]);

  const resumeProgress = () => {
    if (savedProgress) {
      setAnswers(savedProgress.answers || {});
      setReflections(savedProgress.reflections || {});
      setCurrentSection(savedProgress.currentSection || 0);
      setScreen(savedProgress.screen || 'section');
      setSavedProgress(false);
    }
  };

  const startFresh = () => {
    setAnswers({});
    setReflections({});
    setCurrentSection(0);
    setScreen('welcome');
    setSavedProgress(false);
    try {
      localStorage.removeItem('phd-ready-progress');
    } catch (e) {}
  };

  const handleAnswer = (sectionId, qIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${sectionId}-${qIndex}`]: value
    }));
  };

  const handleReflection = (sectionId, text) => {
    setReflections(prev => ({
      ...prev,
      [sectionId]: text
    }));
  };

  const isSectionComplete = (sectionIndex) => {
    const section = SECTIONS[sectionIndex];
    return section.questions.every((_, qIdx) =>
      answers[`${section.id}-${qIdx}`] !== undefined
    );
  };

  const getSectionScore = (sectionId) => {
    const section = SECTIONS.find(s => s.id === sectionId);
    let total = 0;
    section.questions.forEach((_, qIdx) => {
      const answer = answers[`${section.id}-${qIdx}`];
      if (answer) total += SCORE_VALUES[answer];
    });
    return total;
  };

  const getScoreTier = (score) => {
    if (score >= 4) return 'strong';
    if (score >= 2) return 'partial';
    return 'gap';
  };

  const getLowestSection = () => {
    let lowest = SECTIONS[0];
    let lowestScore = getSectionScore(SECTIONS[0].id);
    SECTIONS.forEach(section => {
      const score = getSectionScore(section.id);
      if (score < lowestScore) {
        lowest = section;
        lowestScore = score;
      }
    });
    return lowest;
  };

  const generateInterpretation = async () => {
    setLoadingInterpretation(true);
    const scores = SECTIONS.map(s => ({
      title: s.dimension,
      score: getSectionScore(s.id).toFixed(1),
      tier: getScoreTier(getSectionScore(s.id))
    }));

    const reflectionContext = SECTIONS.map(s => ({
      section: s.dimension,
      reflection: reflections[s.id] || '(no response)'
    }));

    const prompt = `You are Bianca Victorica, a former UC Berkeley graduate admissions officer with 10 years of experience. You've built the PhD-Ready Framework, a diagnostic tool that evaluates PhD applications across four dimensions: Program Understanding, Statement Legibility, Fit Signaling, and Doctoral Readiness.

A PhD applicant just completed the diagnostic. Here are their scores (out of 5):
${scores.map(s => `- ${s.title}: ${s.score}/5 (${s.tier})`).join('\n')}

Here are their reflection responses:
${reflectionContext.map(r => `${r.section}: "${r.reflection}"`).join('\n\n')}

Write a 3-paragraph personalized interpretation of their pattern in Bianca's voice. Rules:
- Direct, plainspoken, no jargon
- No em dashes, no exclamation points
- Identify their strongest and weakest dimensions specifically
- If their reflections were vague or generic, name that as a signal
- If their reflections were specific and grounded, name that as evidence
- End with one concrete next step, not a generic recommendation
- Do not be sycophantic. Be honest but constructive.
- Do not use the phrase "your pattern shows" or "your responses indicate"
- Write as if speaking directly to the applicant

Return only the 3 paragraphs, no preamble.`;

    try {
      const response = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setAiInterpretation((data.text || "").trim());
    } catch (err) {
      setAiInterpretation("Your results have been generated. See the section-by-section breakdown below for your specific pattern. If you'd like a personalized interpretation, book a free 30-minute call at biviconsulting.com/contact.");
    }
    setLoadingInterpretation(false);
  };

  const handleEmailSubmit = async () => {
    if (email && email.includes('@')) {
      setEmailSubmitted(true);

      // POST to Formspree (or your email service) with the lead data
      const scores = SECTIONS.map(s => ({
        dimension: s.dimension,
        score: getSectionScore(s.id).toFixed(1),
        tier: getScoreTier(getSectionScore(s.id))
      }));

      const reflectionData = SECTIONS.map(s => ({
        dimension: s.dimension,
        reflection: reflections[s.id] || '(no response)'
      }));

      // Replace FORMSPREE_ID with your actual Formspree form ID
      const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

      try {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            email,
            scores,
            reflections: reflectionData,
            lowest_section: getLowestSection().dimension,
            timestamp: new Date().toISOString()
          })
        });
      } catch (e) {
        // Fail silently; user still sees results
      }

      if (!aiInterpretation) generateInterpretation();
    }
  };

  const nextSection = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      setScreen('results');
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    } else {
      setScreen('welcome');
    }
  };

  // -------- WELCOME SCREEN --------
  if (screen === 'welcome') {
    return (
      <div style={{ backgroundColor: BRAND.tealLight, minHeight: '100vh', padding: '24px 16px', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {savedProgress && (
            <div style={{
              backgroundColor: BRAND.white,
              border: `2px solid ${BRAND.gold}`,
              padding: '16px 20px',
              marginBottom: 24,
              borderRadius: 4
            }}>
              <div style={{ fontWeight: 700, color: BRAND.teal, marginBottom: 8, fontSize: 15 }}>
                You have saved progress
              </div>
              <div style={{ fontSize: 14, color: BRAND.textMuted, marginBottom: 12 }}>
                Continue where you left off, or start over.
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={resumeProgress} style={btnPrimary}>Resume</button>
                <button onClick={startFresh} style={btnSecondary}>Start Over</button>
              </div>
            </div>
          )}

          <div style={{
            backgroundColor: BRAND.teal,
            color: BRAND.white,
            padding: '48px 32px',
            borderRadius: 4,
            marginBottom: 32
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              opacity: 0.75,
              marginBottom: 12,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              THE PHD-READY FRAMEWORK
            </div>
            <h1 style={{
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 16,
              fontFamily: 'Georgia, serif'
            }}>
              The PhD-Ready Diagnostic
            </h1>
            <div style={{ fontSize: 17, opacity: 0.9, fontStyle: 'italic', lineHeight: 1.4 }}>
              What admissions committees see that you can't.
            </div>
          </div>

          <div style={{ backgroundColor: BRAND.white, padding: '36px 32px', borderRadius: 4 }}>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: BRAND.text, marginTop: 0 }}>
              <strong>Most PhD rejections aren't about qualifications. They're about signal.</strong>
            </p>

            <p style={{ fontSize: 15, lineHeight: 1.65, color: BRAND.text }}>
              This diagnostic evaluates your application across the four dimensions the PhD-Ready Framework
              is built on: <em>program understanding, statement legibility, fit signaling,</em> and <em>doctoral readiness</em>.
              It surfaces the specific gaps committees see when they pass on otherwise qualified applicants.
            </p>

            <p style={{ fontSize: 15, lineHeight: 1.65, color: BRAND.text }}>
              You'll answer 20 questions and complete 4 short reflections. It takes about 20 minutes.
              Your progress saves automatically. At the end, you'll receive a personalized interpretation
              of your specific pattern and where to focus first.
            </p>

            <div style={{
              backgroundColor: BRAND.tealLight,
              padding: '16px 20px',
              margin: '24px 0',
              borderLeft: `3px solid ${BRAND.teal}`,
              fontSize: 14,
              lineHeight: 1.5,
              color: BRAND.text
            }}>
              <strong>Before you begin:</strong> This works best if you have a draft statement of purpose,
              a target program in mind, and a sense of the faculty whose work interests you. If you're
              earlier in the process, complete what you can and revisit later.
            </div>

            <button onClick={() => setScreen('section')} style={{ ...btnPrimary, fontSize: 16, padding: '14px 28px', marginTop: 8 }}>
              Begin the Diagnostic <ChevronRight size={18} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </button>
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: BRAND.textMuted, textAlign: 'center', fontFamily: 'Helvetica, sans-serif' }}>
            Developed by Bianca Victorica  &middot;  BIVI Consulting  &middot;  biviconsulting.com
          </div>
        </div>
      </div>
    );
  }

  // -------- SECTION SCREEN --------
  if (screen === 'section') {
    const section = SECTIONS[currentSection];
    const progress = ((currentSection) / SECTIONS.length) * 100;
    const canProceed = isSectionComplete(currentSection);

    return (
      <div style={{ backgroundColor: BRAND.tealLight, minHeight: '100vh', padding: '24px 16px', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Progress bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              letterSpacing: '0.15em',
              color: BRAND.teal,
              fontWeight: 700,
              marginBottom: 8,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              <span>SECTION {section.id} OF 4</span>
              <span>{Math.round(progress + 25)}% COMPLETE</span>
            </div>
            <div style={{ height: 4, backgroundColor: BRAND.rule, borderRadius: 2 }}>
              <div style={{
                width: `${progress + 25}%`,
                height: '100%',
                backgroundColor: BRAND.teal,
                borderRadius: 2,
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <div style={{ backgroundColor: BRAND.white, padding: '32px 28px', borderRadius: 4, marginBottom: 20 }}>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              color: BRAND.teal,
              fontWeight: 700,
              marginBottom: 8,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              SECTION {section.id}
            </div>
            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              color: BRAND.text,
              margin: 0,
              marginBottom: 20,
              lineHeight: 1.2,
              fontFamily: 'Georgia, serif'
            }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: BRAND.text, margin: 0 }}>
              {section.intro}
            </p>
          </div>

          {/* Questions */}
          {section.questions.map((q, qIdx) => {
            const answerKey = `${section.id}-${qIdx}`;
            const currentAnswer = answers[answerKey];
            return (
              <div key={qIdx} style={{ backgroundColor: BRAND.white, padding: '24px', borderRadius: 4, marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    color: BRAND.teal,
                    fontWeight: 700,
                    fontSize: 15,
                    flexShrink: 0,
                    minWidth: 20
                  }}>
                    {qIdx + 1}.
                  </div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: BRAND.text,
                    lineHeight: 1.5
                  }}>
                    {q.stem}
                  </div>
                </div>
                <div style={{
                  fontSize: 13,
                  color: BRAND.textMuted,
                  lineHeight: 1.55,
                  marginLeft: 32,
                  marginBottom: 16
                }}>
                  {q.explain}
                </div>
                <div style={{ display: 'flex', gap: 8, marginLeft: 32, flexWrap: 'wrap' }}>
                  {['yes', 'mostly', 'no'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(section.id, qIdx, option)}
                      style={{
                        padding: '8px 20px',
                        border: `1.5px solid ${currentAnswer === option ? BRAND.teal : BRAND.rule}`,
                        backgroundColor: currentAnswer === option ? BRAND.teal : BRAND.white,
                        color: currentAnswer === option ? BRAND.white : BRAND.text,
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: currentAnswer === option ? 700 : 500,
                        transition: 'all 0.15s',
                        fontFamily: 'Helvetica, sans-serif',
                        textTransform: 'capitalize',
                        minWidth: 80
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Reflection */}
          <div style={{
            backgroundColor: BRAND.goldLight,
            padding: '24px',
            borderRadius: 4,
            borderLeft: `4px solid ${BRAND.gold}`,
            marginBottom: 24
          }}>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.15em',
              color: BRAND.gold,
              fontWeight: 700,
              marginBottom: 10,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              REFLECTION &middot; TAKE 5 MINUTES. DON'T EDIT YOURSELF.
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: BRAND.text, marginBottom: 14 }}>
              {section.reflection}
            </div>
            <textarea
              value={reflections[section.id] || ''}
              onChange={(e) => handleReflection(section.id, e.target.value)}
              placeholder="Type your response here..."
              style={{
                width: '100%',
                minHeight: 120,
                padding: '12px 14px',
                fontSize: 14,
                fontFamily: 'Georgia, serif',
                lineHeight: 1.5,
                border: `1px solid ${BRAND.rule}`,
                borderRadius: 4,
                resize: 'vertical',
                boxSizing: 'border-box',
                backgroundColor: BRAND.white,
                color: BRAND.text
              }}
            />
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <button onClick={prevSection} style={btnSecondary}>
              <ChevronLeft size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Back
            </button>
            <button
              onClick={nextSection}
              disabled={!canProceed}
              style={{
                ...btnPrimary,
                opacity: canProceed ? 1 : 0.4,
                cursor: canProceed ? 'pointer' : 'not-allowed'
              }}
            >
              {currentSection === SECTIONS.length - 1 ? 'See Results' : 'Next Section'}
              <ChevronRight size={16} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
            </button>
          </div>

          {!canProceed && (
            <div style={{
              fontSize: 12,
              color: BRAND.textMuted,
              textAlign: 'right',
              marginTop: 8,
              fontStyle: 'italic'
            }}>
              Answer all 5 questions to continue.
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------- RESULTS SCREEN --------
  if (screen === 'results') {
    const lowestSection = getLowestSection();

    return (
      <div style={{ backgroundColor: BRAND.tealLight, minHeight: '100vh', padding: '24px 16px', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <div style={{
            backgroundColor: BRAND.teal,
            color: BRAND.white,
            padding: '40px 32px',
            borderRadius: 4,
            marginBottom: 24
          }}>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              opacity: 0.75,
              marginBottom: 8,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              YOUR RESULTS
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
              Where to Focus First
            </h1>
          </div>

          {/* Section Scores */}
          <div style={{ backgroundColor: BRAND.white, padding: '28px', borderRadius: 4, marginBottom: 20 }}>
            <h3 style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              color: BRAND.teal,
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 16,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              YOUR SCORES BY DIMENSION
            </h3>

            {SECTIONS.map(section => {
              const score = getSectionScore(section.id);
              const tier = getScoreTier(score);
              const pct = (score / 5) * 100;
              const tierColor = tier === 'strong' ? '#4a7c59' : tier === 'partial' ? BRAND.gold : '#a04a4a';
              const tierLabel = tier === 'strong' ? 'Solid' : tier === 'partial' ? 'Partial' : 'Gap';

              return (
                <div key={section.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text }}>
                      {section.dimension}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        color: tierColor,
                        fontWeight: 700,
                        fontFamily: 'Helvetica, sans-serif',
                        textTransform: 'uppercase'
                      }}>
                        {tierLabel}
                      </span>
                      <span style={{ fontFamily: 'monospace', color: BRAND.textMuted, fontSize: 13 }}>
                        {score.toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 6, backgroundColor: BRAND.tealLight, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: tierColor,
                      transition: 'width 0.5s'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Where to focus */}
          <div style={{ backgroundColor: BRAND.white, padding: '28px', borderRadius: 4, marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.text, margin: 0, marginBottom: 12 }}>
              Your starting point: {lowestSection.dimension}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: BRAND.text, margin: 0 }}>
              {lowestSection.id === 1 && "Your work is foundational. Until you can describe what you're applying for in specific terms, the rest of the application can't do its job. Start here before revising anything else."}
              {lowestSection.id === 2 && "Your statement needs to do more than read well. It needs to make an argument a committee can evaluate. Most of your remaining time on the application should go here."}
              {lowestSection.id === 3 && "Your fit signaling is generic. This is fixable in days, not weeks. Read the recent work of the faculty you plan to name, and rewrite those sentences with specificity."}
              {lowestSection.id === 4 && "The translation work is where you'll get the biggest return. The evidence is already in your application. It just isn't legible yet."}
            </p>
          </div>

          {/* Email capture / Personalized interpretation */}
          {!emailSubmitted ? (
            <div style={{
              backgroundColor: BRAND.white,
              padding: '28px',
              borderRadius: 4,
              marginBottom: 20,
              border: `2px solid ${BRAND.teal}`
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.teal, margin: 0, marginBottom: 8 }}>
                Get your personalized interpretation
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: BRAND.text, marginTop: 0 }}>
                Enter your email to receive your full results, a personalized reading of your specific pattern,
                and next steps based on what your reflections revealed.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    minWidth: 200,
                    padding: '12px 14px',
                    fontSize: 14,
                    border: `1.5px solid ${BRAND.rule}`,
                    borderRadius: 4,
                    fontFamily: 'Georgia, serif',
                    boxSizing: 'border-box'
                  }}
                />
                <button onClick={handleEmailSubmit} style={btnPrimary}>
                  <Mail size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Send My Results
                </button>
              </div>
              <div style={{ fontSize: 12, color: BRAND.textMuted, marginTop: 10, fontStyle: 'italic' }}>
                No spam. Occasional updates on graduate admissions insights.
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: BRAND.white, padding: '28px', borderRadius: 4, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Check size={20} style={{ color: '#4a7c59' }} />
                <div style={{ fontSize: 14, color: '#4a7c59', fontWeight: 700, fontFamily: 'Helvetica, sans-serif' }}>
                  RESULTS SENT TO {email.toUpperCase()}
                </div>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.text, margin: 0, marginBottom: 14 }}>
                Your personalized interpretation
              </h3>

              {loadingInterpretation ? (
                <div style={{ fontSize: 14, color: BRAND.textMuted, fontStyle: 'italic', padding: '16px 0' }}>
                  Reading your pattern...
                </div>
              ) : (
                <div style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: BRAND.text,
                  whiteSpace: 'pre-wrap'
                }}>
                  {aiInterpretation}
                </div>
              )}
            </div>
          )}

          {/* Consultation CTA */}
          <div style={{
            backgroundColor: BRAND.teal,
            color: BRAND.white,
            padding: '28px',
            borderRadius: 4,
            marginBottom: 20
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 10 }}>
              If you found gaps you're not sure how to close
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 0, opacity: 0.9 }}>
              I work with PhD applicants one-on-one to close exactly the gaps this diagnostic surfaces.
              Statement of purpose, school list, faculty research, recommender strategy. Everything that
              needs to signal doctoral readiness clearly.
            </p>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '12px 16px',
              borderRadius: 4,
              marginTop: 16,
              fontSize: 13,
              fontFamily: 'Helvetica, sans-serif'
            }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>biviconsulting.com/contact</div>
              <div style={{ opacity: 0.75, fontStyle: 'italic' }}>
                No obligation. If it's a fit, I'll tell you what working together looks like.
                If it's not, I'll tell you that too.
              </div>
            </div>
          </div>

          {/* Reset */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button onClick={startFresh} style={{
              background: 'none',
              border: 'none',
              color: BRAND.textMuted,
              fontSize: 13,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: 'Helvetica, sans-serif'
            }}>
              <RotateCcw size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Start over
            </button>
          </div>

          <div style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: `1px solid ${BRAND.rule}`,
            fontSize: 11,
            color: BRAND.textMuted,
            textAlign: 'center',
            fontFamily: 'Helvetica, sans-serif',
            letterSpacing: '0.05em'
          }}>
            THE PHD-READY FRAMEWORK &middot; BIVI CONSULTING &middot; DEVELOPED BY BIANCA VICTORICA
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const btnPrimary = {
  backgroundColor: BRAND.teal,
  color: BRAND.white,
  border: 'none',
  padding: '12px 22px',
  fontSize: 14,
  fontWeight: 700,
  borderRadius: 4,
  cursor: 'pointer',
  fontFamily: 'Helvetica, sans-serif',
  letterSpacing: '0.02em',
  transition: 'background-color 0.15s'
};

const btnSecondary = {
  backgroundColor: BRAND.white,
  color: BRAND.teal,
  border: `1.5px solid ${BRAND.teal}`,
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 700,
  borderRadius: 4,
  cursor: 'pointer',
  fontFamily: 'Helvetica, sans-serif',
  letterSpacing: '0.02em'
};
