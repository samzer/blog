---
title: My experiments with video generation using AI
date: 2026-11-13T22:00:32.169Z
description: Experiments with video generation using AI to create 2D, 3D and realistic videos
tags:
  - AI
  - Video
  - InstaTikTok
  - Claude
---
Recently, I learned that you can create videos using an AI agent harness without any video editing softwares or motion graphic softwares. 

For the experiments, I created a single script that I used for each of the experimments.

The script is a satirical news in the style of the [onion news](https://theonion.com/), and the same audio is also used for each of the videos. The news is regarding Indiranagar neighborhood of Bangalore which is a residential area that has transitioned to more commercial spaces over the last 15ish years. 


>**30-second satirical news reel**  
 Deliver every line with absolute news-anchor seriousness. Small “SATIRE” label on screen._
>
  **0–8 sec | Anchor**  
  “Breaking: An Indiranagar landlord has converted an occupied apartment into a café. The eviction was announced as a surprise collaboration.”
>
  _Headline: TENANT REBRANDED AS FOOTFALL_
>
  **8–16 sec | Ridiculously aesthetic café footage**  
  “His bedroom seats twelve. His toilet is now a speakeasy. Cocktails cost twelve hundred. The flush costs extra.”
>
  **16–21 sec | Exhausted tenant, interviewed**  
  “I asked for my deposit back. They offered equity.”
>
  **21–30 sec | Back to anchor**  
  “The café employs six people to explain why there’s no normal coffee. Police have asked the tenant to move along. He’s ruining the vibe.”


All the experiments have been done with Claude Code and Opus 5.5

## Experiment 1: 2D Instagram/Tiktok video using JS, CSS and HTML

This is the simplest one where Remotion 4 with React 19 was used to create the frames and scenes. SVG for the characters. Most of the animation is by using Remotion's capabilities and not by CSS's raw animation. 

Overall the video has come out fine although there are few minor issues in certain frames like the bedroom frame having chairs overlayed.

<iframe
  src="https://www.youtube.com/embed/YBF_EaCMGCw"
  title="YouTube Short"
  style="width: 100%; max-width: 360px; aspect-ratio: 9 / 16; border: 0;"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>


## Experiment 2: 3D Instagram/Tiktok video using JS, CSS and HTML

This makes use of the same tech stack as before with the addition of three.js that makes use of WebGL. 

The 3D one also looks good for the first run. The cafe employees popping up behind the anchor is weird and funny, the video is supposed to be satire so I guess its fine  <span style="font-size: 40px;">🤷 </span>
 
<iframe
  src="https://www.youtube.com/embed/4dKpFFKYArE"
  title="YouTube Short"
  style="width: 100%; max-width: 360px; aspect-ratio: 9 / 16; border: 0;"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>


## Experiment 3: Realistic looking video using Seedance 2.5 via Higgsfield

Made use of Seedance 2.5 via Higgsfield. Got the Higgsfield MCP server setup on my Claude Code. GPT Image 2.6 was used to create still image shots.

The clips were edited using FFmpeg.

Also, learned the hard lesson that Seedance 2.5 burns Higgsfield credits really fast and pretty much exhausted all the credits of my monthly plan. The better approach would have been to use Seedance 2.0 mini to create low quality draft videos and then once finalized, use Seedance 2.5 to generate the final clips. 

Even though I burned through the credits, the clips generated in the first pass came out well. The expression of the Anchor and Tenant adds to the Satirical story 

<iframe
  src="https://www.youtube.com/embed/bN6LZACVheY"
  title="YouTube Short"
  style="width: 100%; max-width: 360px; aspect-ratio: 9 / 16; border: 0;"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>


What I learned is that creating the 2d and 3d videos doesn't cost much and the main cost is the tokens consumed. Creating videos via video generation models costs more and the Higgsfield credits needs to be used effectively 

Choosing the type of video to be generated will depend on the use case and constraints if there are any. 

For the this Satirical Script, I liked the realistic video the most.

