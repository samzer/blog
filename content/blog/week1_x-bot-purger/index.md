---
title: Week 1 - Twitter/X bot Remover
date: "2026-01-08T12:00:32.169Z"
description: "When faced with 2000+ bot followers on X and no free solutions that work, I built a Playwright automation tool to detect and remove them using pattern matching—no paid APIs or broken extensions needed."
tags: Project
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/cpUto_9b8Pg?si=uLneSpSAyZMDp7il" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Its been long that I've been active on Twitter which is now called X. One thing that annoys me is that there are lot of followers that are bots and its very evident that they are bots by just looking at their user id.

I asked Claude on how I could remove them.

One of the options that it gave was manual which obviously won't work when you have 2000+ followers in the list.

It gave few websites that are official partner of X for which you have to pay.

There few chrome extensions which used to work once upon a time but as the front end code of X changes, that extension broke.

The X APIs are also paid.

Now either I could make a new Chrome extension myself or use something like Playwright to automatically navigate the website and take action on my behalf.

I went ahead with the Playwright approach. 

The code opens upon a browser and hands over control to the user to perform the login. Once login is complete, the code takes over and navigates to the follower list. I've created regexes for suspicious username patterns which the code utilises to remove the follower.

The code can be run in permission mode where it will ask you before it removes the follower and it can also be run with full privileges without taking permission for removal.

[The codebase can be found here.](https://github.com/samzer/x_bots_purge)


