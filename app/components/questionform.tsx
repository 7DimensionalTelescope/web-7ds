import React, { useState } from 'react';

/* ---------------------------------------------------------------------------
   Ask the principal investigator a question.

   There is no mail service behind this site — no SMTP credentials, no form
   backend — so the form composes the message and hands it to the visitor's own
   mail client rather than pretending to send it. That is honest about where
   the message goes, keeps the reply address theirs, and means a question is
   never silently lost in a service nobody is watching.

   The page also carries a plain mailto link, so the form failing (or scripting
   being off) never leaves a reader without a way to ask.
--------------------------------------------------------------------------- */

const PI_EMAIL = 'mim@astro.snu.ac.kr';

const TOPICS = [
  'Observing with 7DT',
  'Requesting data',
  'Data format or processing',
  'Software',
  'Publication and acknowledgment',
  'Something else',
];

export default function QuestionForm() {
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [question, setQuestion] = useState('');
  const [handedOff, setHandedOff] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signature = [name, affiliation].filter(Boolean).join(', ');
    const body = [
      question.trim(),
      '',
      '—',
      signature ? `From: ${signature}` : null,
      'Sent from the 7DS website',
    ]
      .filter((line) => line !== null)
      .join('\n');

    const href = `mailto:${PI_EMAIL}?subject=${encodeURIComponent(
      `7DS question: ${topic}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setHandedOff(true);
  };

  return (
    <form className="qform" onSubmit={onSubmit}>
      <div className="qform__row">
        <div className="qform__field">
          <label htmlFor="q-name">Your name</label>
          <input
            id="q-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Optional"
          />
        </div>
        <div className="qform__field">
          <label htmlFor="q-aff">Affiliation</label>
          <input
            id="q-aff"
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            autoComplete="organization"
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="qform__field">
        <label htmlFor="q-topic">Topic</label>
        <select id="q-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {TOPICS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="qform__field">
        <label htmlFor="q-body">Your question</label>
        <textarea
          id="q-body"
          rows={6}
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="If the question is about a particular field or dataset, include the position or tile identifier, the filters and the epoch range."
        />
      </div>

      <div className="qform__actions">
        <button className="btn btn--primary" type="submit">
          Compose the question
        </button>
        <p className="qform__note">
          This opens the message in your own email program, addressed to the principal
          investigator, so you keep a copy and the reply comes to you. Nothing is sent from this
          page and nothing you type here is stored.
        </p>
      </div>

      {handedOff && (
        <p className="qform__sent" role="status">
          Your email program should now be open with the message ready. If it did not open, write
          to <a href={`mailto:${PI_EMAIL}`}>{PI_EMAIL}</a> directly.
        </p>
      )}
    </form>
  );
}
