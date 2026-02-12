---
title: AI Learnings Checkpoint 2026 Feb
date: "2026-02-12T22:00:32.169Z"
description: A practical checkpoint on using AI and LLMs after two years of heavy use—what I use it for at work and in life, principles that actually improve results, mistakes to avoid, and where it’s delivered real impact versus hype.
tags: AI 
---

# AI Learning Checkpoint 2026 Feb

I recently read [S Anand's blog post on AI advice](http://www.s-anand.net/blog/ai-advice/) which shared by [Sunil](https://in.linkedin.com/in/sunil-dhaka) from my team, and it got me thinking about my own journey with LLMs and AI agents. Over the past 2 years, I've been experimenting extensively with these tools, both in my personal life and at work. What started as casual experimentation has become a set of workflows, tools and solutions that I use everyday

Below is simply my own version: my learnings from hundreds of hours of playing around with AI, making mistakes, and figuring out what actually works.

## What I've used it for

In my personal life, I've used AI for:

- Transcribing recipes from Instagram cooking reels
- Analyzing health insurance renewal documents
- Evaluating financial products
- Using it as a sounding board for ideas
- Asking it to simplify complex topics and explain them from different perspectives
- Experimenting with new technologies I'm not familiar with
- Trying out hairstyles and apparel by uploading my image
- Using voice to check information in group settings
- Using voice to compile my thoughts

At work, I've used AI for:

- Creating quick mockups of screens
- Performing quick dirty analysis on datasets
- Creating internal tools
- Building marketing apps
- Summarizing core themes from sales calls
- Extracting customer pain points from calls and generating reports
- Auto-generating follow-up emails for account executives on existing customers
- Using free text to ask questions against our CRM
- Classification based on text data
- Data enrichment
- Customer research reports
- Risk research reports
- Unstructured to structured data parsing
- Auto data manipulation from any format to a target format
- Validating claims made by Sales or Customer teams
- Lead scoring at the top of the funnel
- Creating presentations based on a bunch of documents

The key insight is that if something is repeatable or research based where the workflow has digital touch-points, AI can mostly do it.

## Core Principles That Make the Difference

Few core principles that separate effective AI use from frustrating experiences.

### 1. Give comprehensive context upfront, ask surgical questions for follow ups

This might be the most important lesson. When you're setting up an AI agent or starting a new task, give it everything it needs to understand the problem space. Then, as you iterate, ask targeted, specific questions.

For example, when I'm extracting customer pain points from sales calls, I don't just say "find the pain points." I provide context: background on our product, how our pricing works, how the business model operates. Then I let the AI identify potential pain points within that framework.

For lead scoring, I create a well defined prompt on how to research a company online and what weights to give to each dimension like customer reviews, product recalls, negative news, etc. The comprehensive setup makes all the difference.

Also for simple chat based AI prompt, you can provide simple prompt to get an extensive prompt which can then be edited if needed and then fed to the AI.

### 2. Ask targeted questions, not broad ones

This principle works hand in hand with the first one. Specificity gets better results.

Instead of "analyze this dataset," ask "what's the conversion rate trend for leads from organic sources over the last quarter?"

Instead of "help me brainstorm," ask "what are three potential approaches to reducing onboarding time for new customers, considering our current tech stack?"

The more surgical your question, the more useful the answer.

### 3. Let go of old beliefs and stay curious

This is probably the biggest mental shift I had to make. The bias is often "this can't work" or "AI can't handle this" before even trying. I've caught myself doing this multiple times, assuming something couldn't be done by AI simply because I'd never tried it with AI.

The antidote is curiosity. Be willing to experiment. Test your assumptions. You'll be surprised how many times the AI handles something you thought was too nuanced or too complex.

### 4. Understand different model capabilities and when to use them

Not all models are created equal. Knowing when to use GPT 4o versus GPT 4o mini versus GPT 4o nano (or Claude Opus versus Sonnet versus Haiku) matters. Sometimes you need the reasoning power of the flagship model. Sometimes you need speed and cost efficiency and a smaller model works fine.

This is where experimentation across multiple LLMs pays off. Don't marry yourself to one company's models. Try Claude, try ChatGPT, try others. They each have strengths and weaknesses. You'll build an intuition when you try different models.

## Common Mistakes I See (and Have Made)

### 1. One shot, one sentence prompts expecting magic

This is the most common mistake. Someone types "analyze this data" or "write me a report" and gets frustrated when the output is generic or misses the point. The problem isn't the AI. It's the lack of context and structure in the prompt.

### 2. Not understanding model differences

Using GPT 4o mini for a complex reasoning task that needs GPT 4o. Or using an expensive flagship model for simple text formatting. Both are wasteful, either of quality or of money.

Related: sticking with one LLM provider and never experimenting with others. Each model has different strengths. You're limiting yourself if you don't explore.

### 3. Giving up too quickly

AI interaction is iterative. Your first prompt probably won't nail it. That's fine. Refine, add context, clarify what you want. The conversation is the product, not just the first response.

## Real Impact, Not Just Theory

Actual outcomes at work, because I think the hype around AI often obscures real ROI.

**Risk analysis:** We brought down the time required to analyze certain documents that need human interpretation from hours to minutes. This wasn't about replacing human judgment. It was about augmenting it and handling the initial heavy lifting.

**Lead scoring:** We made our growth team more efficient by rank ordering leads that need to be prioritized. Instead of account executives spending time qualifying every lead, they focus on the ones most likely to convert.

**Development velocity:** We brought down the development time of a few projects from what would have taken a month to just a few days. This saved significant engineering bandwidth and let us ship faster.

These aren't theoretical benefits. These are measurable improvements in how work gets done.

Personally, I've saved countless hours transcribing recipes, analyzing documents, and researching topics. But more importantly, AI has become a thinking partner, helping me refine ideas, explore angles I hadn't considered, and organize scattered thoughts.

## Why Now Is Different

If one tried AI a year or two ago and found it underwhelming, I get it. My biggest frustration used to be hallucinations. The AI confidently making up facts or providing incorrect information. That's much less of a problem now. Models have genuinely gotten better, and reasoning capabilities have improved dramatically.

I believe this is a permanent change in the workplace. AI is going to automate workflows and amplify the productivity of highly effective employees. Organizations that effectively use AI and agents will have an edge over competitors who don't.

Here's the thing: using AI is for everyone, regardless of field. You don't need to be in tech. A real estate agent can use AI to automatically respond to leads with a well drafted response while in the field. A teacher can use it to generate personalized feedback for students. A lawyer can use it to review contracts or research case law.

There's a distinction worth making here: "using AI" (which anyone can do) versus "building AI powered products" (which requires more technical capability). Using AI helps you personally get more done. Building AI powered products helps save time on tasks that previously took longer or required more people.

## What I'm Still Figuring Out

I don't have everything figured out, and I think it's important to say that. One area I'm actively exploring is multi agent systems. Giving more independence to agents and using other agents to review the output of the original agent.

The challenge is partly about trust, but more about lack of effective documentation. For agents to work independently, they need comprehensive documentation about business processes and nuances. They need to understand the different aspects of the business that aren't explicitly written down anywhere. Building that documentation layer is a work in progress

This is an evolving space. What works today might be outdated in six months. The key is to keep experimenting.


