// Journal articles published on lenainthewild.com. Each entry gets its own
// page at /journal/<slug> and joins the sitemap; the home page's "Entries From
// My Journal" card with the same slug links to it.
//
// Article text is written plainly:
//   - a blank line starts a new paragraph (a single line break is kept)
//   - "## " starts a heading, "> " a pull quote, "- " a list item
//   - a first line starting with "🎧 " is the song that goes with the piece

export type JournalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'listen'; text: string }
  | { type: 'list'; items: string[] };

export type JournalArticle = {
  slug: string; // the URL: /journal/<slug>
  title: string;
  subtitle?: string;
  // Shorter title for Google and share previews, when the real one is long.
  seoTitle?: string;
  description: string; // ~150 characters, shown in Google and share previews
  date: string; // YYYY-MM-DD, first published
  category: string;
  tags: string[];
  image?: { src: string; alt: string; pos?: string };
  substackUrl?: string;
  // The offer to point readers to at the end, and the line that leads into it.
  offer?: 'The 5 Day Reconnect' | 'The Freedom Frequency';
  offerLine?: string;
  text: string;
};

// Turns an article's plain text into blocks for the page.
export function parseArticle(text: string): JournalBlock[] {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): JournalBlock => {
      if (chunk.startsWith('🎧')) return { type: 'listen', text: chunk.replace(/^🎧\s*/, '') };
      if (chunk.startsWith('## ')) return { type: 'h2', text: chunk.slice(3) };
      if (chunk.startsWith('> ')) return { type: 'quote', text: chunk.slice(2) };
      if (chunk.startsWith('- ')) return { type: 'list', items: chunk.split(/\n(?=- )/).map((i) => i.slice(2).trim()) };
      return { type: 'p', text: chunk };
    });
}

export const journal: JournalArticle[] = [
  {
    slug: 'breaking-free-from-the-system',
    title: 'I Started Breaking Free from the System Before I Even Had the Words for It',
    subtitle:
      'At 21, I packed my bags and moved to an island so remote you could only get to it by one small boat or a teeny tiny three-seater plane — once a day.',
    seoTitle: 'Breaking Free From the System at 21: My First Leap to an Island',
    description:
      'At 21, heartbroken with a degree I didn’t want to use, I left Sydney for a tiny Whitsundays island. My first leap toward freedom, before I had the words.',
    date: '2026-03-03',
    category: 'Wild',
    tags: ['first leap', 'freedom', 'island life', 'breaking free from the system', 'starting over'],
    image: { src: '/images/road/road-8.jpg', alt: 'A palm tree above a deep blue bay and green hills', pos: '50% 70%' },
    substackUrl: 'https://substack.com/home/post/p-189725048',
    offer: 'The Freedom Frequency',
    offerLine: 'If you’ve always felt the pull to do life differently, this is everything I learned going from stuck to breaking free.',
    text: `
🎧 “Sailor Song” – Gigi Perez

My desire for freedom started in my teens. My first leap was at 21.

Up until this point, I had been doing all the things we were “meant” to do. The things society expected of us. I went to school, got a good education, worked my way up the ladder to get into a good uni — all just to make good money?

That was the belief we were sold.

As a kid, I had no idea what I wanted to be when I was older. And when it came time to choose a subject for uni, I literally opened the university handbook, pointed at something, and landed on Graphic Design. I honestly didn’t even know what that was at the time.

I ended up studying a Bachelor of Design.

I had already been working since I was 16 and continued working as a barista/manager, running a café while completing my full-time studies. I genuinely had no clue what I was going to do when I finished uni. I just remember wanting it to be over so I could finally be free.

After 3.5 years of study and work, I got my degree and thought, now what?

I knew there was no way in hell I wanted to get a “real” job. To me, it was too much responsibility. Too locked down. Aka trapped.

So I kept working at the café a little longer, saving money.
Just caught in Groundhog Day.

Shortly after I graduated, my boyfriend of eight years broke up with me.

Of course, at 21, it felt like my whole world was crashing down. I remember sitting outside by the pool in absolute hysterics, cigarette in mouth, bawling my eyes out. My mum came home early and saw me — mind you, I had always hidden that I smoked.

She looked at me and said, “What’s wrong?” Then pointed at the cigarette.

And I was like, “I don’t careeeee mum.”

She dropped the smoking thing instantly. Priorities haha.

At 21, I had no idea how to regulate my emotions. He was my first love. Our lives were completely in sync. I worked for his parents managing their restaurant. My friends were his friends. My life was his life.

I had completely lost myself in that relationship. I had no identity outside of it. And at that age, I didn’t know any better.

Forever my breakup song was ‘Down’ by Jay Sean. I remember driving in my newly bought car, blasting it, bawling my eyes out — yet somehow feeling empowered that I was moving on at the same time.

Anyway, back to the story.

It felt like everything I had worked so hard for — making my way through school and uni while juggling work — was meant to be this magical, celebratory milestone moment. I had done it. Put in the hard work. Got the degree. Had the savings.

But it was the opposite.

I had just lost my boyfriend. Lost my friends. Lost my life as I knew it.

> But little did I know at the time… it would be the greatest thing that could have ever happened to me.

Once I started to come out of the breakup fog, I began thinking about what I actually wanted.

The thing I knew for sure:
I wanted to travel.
I wanted sunshine.
I wanted freedom.
And I wanted to get the fuck out of Sydney.

I did not want to start my career and get locked down.

I had heard about people working on tropical islands, teaming up with holiday goers and showing them around like tour guides. Being paid to travel and explore. I thought that would be the coolest job ever.

So I started applying for jobs in North Queensland, in the Whitsundays.

Before I knew it, I had an interview.
The next day, I got the call.
“Congratulations, you got the job.”

On a remote little island called Brampton Island, an island so isolated you could only get there by a boat that left once a day or a teeny tiny three-seater plane.

About a 2.5-hour flight from Sydney (my hometown), followed by a 30-minute ferry ride.

The job started less than a week after I applied.

It was wild how fast everything started happening. One minute I was stuck, heartbroken, feeling sorry for myself and so over my life. The next minute, my life had done a full 180. I was packing everything into a suitcase. Booking a flight. Having a farewell party.

In an instant, my world changed. (It just goes to show: when you’re in alignment, when something is meant for you, the universe will make it happen fast.)

I was excited. Scared shitless. But deep down, I knew it was the right move.

People thought I was crazy.
“Shouldn’t you be starting your career?”
“You’ve just finished uni.”
“Isn’t that a bit risky?”

But I didn’t let their negative beliefs stop me. I knew this was what I wanted.

I remember feeling both excitement and fear when telling people I was moving to the Whitsundays. Excitement because I was finally choosing myself. Fear because I knew I wasn’t following “the rules.”

And then, when I finally boarded the plane.
It became reality.

As the plane started to take off, I stared out the window. For the first time in a long time, it was quiet. No noise. No expectations. No relationship. No routine.

Just me.

And in that moment, an overwhelming wave of emotion crashed over my entire body. Tears poured down my face. Breathing uncontrollably. Heart hammering out of my chest.

And the only thought running through my mind:

> What the fuck am I doing?

Next up: Find out what happened on the other side of my leap.
`,
  },
  {
    slug: 'living-in-fight-or-flight',
    title: 'For Years I Didn’t Even Realise I Was Living in Fight or Flight',
    subtitle: 'I just thought I was driven. Productive. Good at getting things done. What I’m learning about slowing down after years of hustle conditioning.',
    seoTitle: 'Living in Fight or Flight Without Realising It: How I Slow Down',
    description:
      'I thought I was just driven and productive. I was living in fight or flight. The signs I notice now, and how I slow down when hustle creeps back in.',
    date: '2026-03-05',
    category: 'Healing',
    tags: ['fight or flight', 'nervous system', 'slowing down', 'hustle culture', 'burnout'],
    image: { src: '/images/road/road-5.jpg', alt: 'Feet up on a hillside, looking out over the sea at sunset', pos: '50% 40%' },
    substackUrl: 'https://lenainthewild.substack.com/p/for-years-i-didnt-even-realise-i',
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re in that in-between stage of unlearning hustle culture, this is where I’d start: five days of simple practices to slow down and come back to yourself.',
    text: `
🎧 “O, I Love You” – Essie Jain

I went from a lifetime of living in fight or flight to living in a slowed down state of flow and peace.

Now that I’ve experienced what life is like outside of that stressed state, it’s easier for me to notice when I’ve slipped back into it. It slips back in subtle ways, sometimes without me even realising it.

Here’s what I’m noticing, and what might help someone who’s in that in-between stage of unlearning hustle culture and learning how to slow down:

- Bringing awareness to being in this panicky state is step one. Because once you’re aware that you’re in fight or flight, you see it from a higher perspective. You’re no longer in it. And in that moment, you’re back in the present.
- When I’m in it, I notice my thoughts first. They’re generally along the lines of, “Ok Elena, you have this 1 hour window to get all of these things done.” It’s thoughts that rush me to move faster and get things done quicker. Thoughts that add pressure on myself to get things done now. Thoughts that make me feel like I need to hurry or I’m going to fall behind.
- Then there’s the environment. There are certain items I’ve associated with stress that trigger me straight into that state, and the thoughts and energy that come with it. For example, opening up my laptop and logging into my work account. Looking at my task list and instantly feeling like I need to get all of it done now. Nothing external is actually happening. But internally, my body shifts. Stimulants like coffee, I know, can push me more into a fight or flight state (but I love my morning coffee way too much to give that up).
- Then there’s the physical signs. Tense shoulders, I feel like I need a massage. Dizziness. Brain fog. Quick, rushed actions like rummaging through my bag. Eating fast. Writing fast. Typing fast. Walking fast. Not present. Just moving.

All these little things we’ve associated with stress from past experiences. When we’ve repeatedly been in a rushed state while doing certain activities, our nervous system links them together. So when they show up again in our environment, it can trigger that stress response without us even noticing.

And it isn’t just activities and environments. It can be people, conversation topics etc.

## So how do I pull myself back out of it?

Firstly, I stop everything I’m doing. I close the laptop. I put the work away.

I place my hand on my heart and say, “I am safe to slow down. It’s ok.” And I repeat it.

I breathe and bring awareness back to my breath.

I use whatever mindfulness practice I feel I need in that moment. I generally turn to meditation. Closing my eyes and centering myself by turning my focus inward. Allowing the noises going on around me to just be, and bringing my attention back to myself for however long I feel I need.

Then when I start my day again, or come back to my work, I’m doing it from a grounded place. Not from a forced or rushed state.

> And here’s what I’ve realised: it’s actually more efficient for me to work from a slowed down state.

This is where the ideas, the creative solutions come. Where flow happens. Where productivity feels easier.

When I try to force myself to be productive in a stressed state, I don’t actually get anywhere faster. I end up using the same amount of time, getting less deep focused work done and struggling through it.

So I slow down my movements. I eat slower. I write slower.

And I begin again.
From a slower, more grounded, happy place.
`,
  },
  {
    slug: 'leaping-into-the-unknown-part-1',
    title: 'Leaping into the Unknown: Part 1',
    subtitle: 'At 36, I threw my life up in the air. I left everything I knew behind in Sydney and booked a one-way ticket to Bali.',
    seoTitle: 'Leaving Sydney for Bali at 36: Leaping into the Unknown (Part 1)',
    description:
      'At 36 I quit my 8-year PT career, packed up my life in Sydney and booked a one-way ticket to Bali. The fear, the knowing, and how the leap began.',
    date: '2026-03-13',
    category: 'Wellness',
    tags: ['leaving Sydney', 'moving to Bali', 'trusting your intuition', 'starting over at 36', 'quitting my job'],
    image: { src: '/images/road/road-2.jpg', alt: 'Lena on a scooter on a jungle road, arm raised to the sky', pos: '50% 35%' },
    substackUrl: 'https://substack.com/home/post/p-190792316',
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re standing in the life you worked so hard to build and thinking… this isn’t it, I made something for you. Start here.',
    text: `
People asked me, “aren’t you scared?”

And yeah, of course I was scared.

But underneath the fear, there was something so much stronger. This deep, unshakeable knowing that I was fully supported. That if I was brave enough to take this leap — this huge, terrifying, life-altering step — and trust my intuition, the universe would have no other option but to reward me on the other side of it.

I believed that. Genuinely. From the bottom of my heart.

And that belief? It’s what pulled me through the fear.

This is that story.

But getting to that point didn’t happen overnight.

In the last few years in Sydney, I had already started to wake up to the fact that I didn’t want to be doing things like everyone else. It became impossible to ignore after I came back from what was meant to be a dream trip to Europe, which turned into a nightmare. I was sick for most of it, completely burnt out from running myself into the ground before I’d even boarded the plane.

Coming home, I knew something had to change.

That’s when I started making big moves. As a Personal Trainer running my own business, the expectation was that you work 24/7. So I started small, I cut back on sessions, dropped the clients who weren’t in alignment with me, and started prioritising self-care. Every Wednesday, I worked a half day. The rest was blocked out — a non-negotiable.

Then I went further. I dropped to four days a week, while everyone around me was working five to seven.

It felt uncomfortable at first. The other trainers had opinions. “You’re lazy.” “Look at her taking all that time off.” “She must not be doing well.”

I just kept reminding myself: stay in your own lane. Block out the noise. People judge you because they either want what you have, or they’re projecting their own insecurities onto you.

And here’s the funny thing — not long after, some of those same trainers started cutting back their days too. I wasn’t trying to lead anyone anywhere. I was just doing what felt right for me. But sometimes simply having the courage to do things differently is enough to give others permission to do the same.

At the end of the day I thought, they can judge all they want. But I’m the one with the courage to do things differently. I didn’t want to be a robot anymore. I didn’t want to keep performing for a system that wasn’t serving me. These were my first steps toward breaking free.

So when the moment finally came to leap, I took it. I quit my career of 8 years, bought that one-way ticket, packed up my entire life and didn’t look back.

> And the universe? It delivered.

When I arrived in Bali, everything unfolded with ease. I made a group of friends on my very first night. Found a villa within a couple of weeks without even looking — the opportunity just landed in my lap.

Because when you believe something so fiercely, so completely, from the bottom of your heart — it has no choice but to become your reality.

Part 2: What happens when you arrive in paradise… and bring all your old patterns with you.
`,
  },
  {
    slug: 'slowing-down-in-bali-what-real-freedom-feels-like',
    title: 'Imagine Waking Up on a Monday to No Alarm',
    subtitle: 'And the only question you need to answer is: “What do I feel like doing today?” That’s my life now. And let me tell you, it didn’t happen by accident.',
    seoTitle: 'Slowing Down in Bali: What Real Freedom Actually Feels Like',
    description:
      'Living with a Balinese family taught me what freedom really is. Why I couldn’t slow down in Sydney, and how I now create my days with intention.',
    date: '2026-03-16',
    category: 'Travel',
    tags: ['slow living', 'living in Bali', 'freedom', 'intentional living', 'hustle culture'],
    image: { src: '/images/road/road-6.jpg', alt: 'A lone tree by a still lake with hills behind', pos: '50% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you feel like there’s got to be more to life than this, but can’t quite hear yourself clearly yet, start here.',
    text: `
🎧 “Oceans” – Liv Harland

Starting over in Bali has completely rewired how I see life. Most Westerners see Bali as a paradise playground — luxurious villas, stunning cafes, beautiful people, unlimited everything. And yeah, that’s real. But that’s not what kept me here.

What kept me here is the people.

I’m based in a Balinese home with my little Balinese family. And staying long-term, really being embedded in the culture, has opened my eyes to something I wasn’t expecting. The Balinese people have quietly figured out something most of us are still chasing.

The locals are always smiling. Always laughing, joking, being playful with each other like kids who haven’t been told to grow up yet. They take their religion seriously, their community seriously, their ceremonies and offerings and craft — but life itself? They hold it lightly.

I walk out my front door and the neighbours wave, stop to chat. People literally stop their bikes in the middle of the street just to smile, say hello, Selamat Pagi, and have a genuine chat. With no ulterior motive. They make time for you. They are present and happy.

From the birds chirping at sunrise over the jungle, to the morning local market, to watching the locals weave offerings for ceremonies and the temple — there’s this slow, deliberate, intentional way of moving through the world. And it made it so much easier to consciously choose to slow down too.

## Why Bali? Couldn’t you have just slowed down in Sydney?

Because here’s the thing — people always ask me that.

Honestly? No. And I think deep down, you already know why.

Our environment shapes us whether we want it to or not. No matter how hard I tried to break free from the hustle conditioning in Sydney — the performance, the pressure, the noise, I was still absorbed in it. It was all around me.

Here, the default setting is different. The energy is different. And when you’re surrounded by people who live simply, joyfully, and without apology — it becomes your new normal too.

That shift is what gave me permission to finally slow down enough to hear myself again. To hear my own intuition without the noise drowning it out. Without outside expectations telling me who I should be or what I should want.

## What real freedom actually feels like

And now? I get to choose.

I choose what I do each day. If I feel like working, I work. If I feel like doing nothing, I do nothing. I create my days how I want them to be. I invest my time and energy into things and people that actually light me up. I create my days with intention, not by default.

This, to me, is what real freedom actually feels like. Not the amount of money in your bank account. Not the number of followers. Not the most luxurious villa with an infinity pool.

> It’s waking up and asking yourself what you want, and actually being free enough to get to do those things.

None of the old noise matters when you’re fully in the moment right in front of you. The stress, the comparison, the reliving of the past — it all just… dissolves.

This is your permission slip, your reminder. You don’t have to do life the way you’ve been told. You don’t have to follow a script that was never meant for you.

You have a choice. You get to choose yourself.
`,
  },
  {
    slug: 'leaping-into-the-unknown-part-2',
    title: 'Leaping into the Unknown: Part 2 — What Happens When You Bring Your Old Patterns With You',
    subtitle: 'I was in Bali. Sunsets, coconuts, villa life. And I was quietly falling apart. They say you can’t run from your problems. Turns out, they were right.',
    seoTitle: 'You Can’t Outrun Your Patterns: Falling Apart in Bali (Part 2)',
    description:
      'I moved to Bali and brought my old patterns with me: the hustle, the scarcity, the 5am alarms. What falling apart in paradise finally taught me.',
    date: '2026-03-24',
    category: 'Healing',
    tags: ['moving to Bali', 'old patterns', 'scarcity mindset', 'intuition', 'Canggu vs Ubud'],
    image: { src: '/images/road/road-4.jpg', alt: 'A white scooter parked under palm trees on a quiet path', pos: '50% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’ve been ignoring a quiet pull and going back to what’s familiar, it’s time to start listening, before the universe makes you.',
    text: `
🎧 “Tidal Wave” (Acoustic) – Old Sea Brigade

After taking the leap — uprooting my entire life and landing in Bali — everything flowed, just like I said it would. The friends, the home, the opportunities, the abundance. The universe delivered. (Little did I know this would be short-lived…)

What I didn’t realise was that I’d also packed something I didn’t intend to bring with me.

On the outside, it looked like I was living the dream. And on some level, I was. I’d just got to Bali — I was chasing sunsets, sipping coconuts, spending my days by the pool. I was surface-level happy.

But underneath? I felt off. Ungrounded. Within a couple of months I was up, I was down — lost, confused, overwhelmed. And the plan I’d made to fund my life over here? The brands I’d been working with in Sydney who’d promised to keep working with me when I moved — it all fell through. I’d even landed new brand deals over here from Aus and those fell through too.

The plan I’d built to sustain this new life was a bust. And I had not budgeted for this.

Two months passed. Three months. Five months. Still, barely any income. And with every month that ticked by, I started feeling the same things I’d felt back in Sydney — the same feelings I’d left to escape.

Trapped. Scared. Confused. Hopeless. Stressed.

I was thinking wtf? I literally had uprooted my whole entire life to Bali and I’m still feeling like this?

What people saw on Instagram wasn’t my whole reality. Nobody saw the spiral happening behind the coconuts and the golden-hour shots. I was lost, seeking answers, quietly falling apart in paradise.

And then one day a friend said to me:

> “Lena, you’re trying to live your Sydney life in Bali.”

It finally clicked.

I hadn’t escaped my old life. I’d recreated it, just with a nicer backdrop.

I wasn’t physically running back-to-back PT sessions anymore, but I was still setting a 5am alarm every single day. Still structuring every hour of my day — meditation, oracle cards, 20,000 steps, gym, business work, sunset, repeat. Zero space for flow. Zero room to breathe. And underneath all of it, the same old conditioning quietly running the show — the scarcity mindset, the hustle, the relentless chasing of productivity while the money drained away and the panic quietly built.

> You can’t outrun your patterns. They come with you.

## My little escapes to Ubud

Every few weeks, I would feel an urge to run off to Ubud. It was the one place where I felt like myself again. Clear. Grounded. Free.

But I kept going back to Canggu. I’d already built a life there — the friends, the spots, the routine. (My comfort zone.) I had just made this big transition to Bali, I wasn’t ready to pack up and start again (again!!).

My intuition was screaming. I wasn’t listening.

You know what they say — if you don’t listen to your intuition, the universe will eventually put something so big in your path that you have no other choice but to listen.

I had to learn that the hard way.

Eventually, I started to shift things. I stopped overscheduling my days. Stopped forcing myself to go to the gym. Started letting my body actually rest. And finally, finally — I listened and made the move to Ubud.

And it helped. Canggu is definitely more hustle energy. It’s essentially Sydney in Bali — busy, performative, everyone chasing something, minimal people slowing down. Ubud was different. I slept more than I had in years. I moved slower. I started to exhale.

But even that wasn’t enough.

## When the universe made me stop

The universe, apparently, had decided it was done being patient with me.

I was on the back of a friend’s bike, wearing sandals, heading down a tiny alley a few minutes from my place. We’d just come from a dinner for a UGC collab — the kind of work that no longer felt aligned. And then, out of nowhere, I felt something catch my toe.

Blood spurting everywhere. Horror movie levels of blood.

An eighth of my toe — sliced off clean.

I couldn’t walk for three weeks. Alone in a country that wasn’t mine, in a place where I barely knew anyone, because I’d only just arrived.

It was brutal.

But the universe had finally got my attention. I had no choice but to stop. Completely. For the first time in as long as I could remember, I literally could not push, force, or hustle my way through anything.

And that stillness, as painful and terrifying as it was — became one of the most pivotal moments of my spiritual journey.

Because sometimes things have to completely unravel before they can bloom into something you never could have imagined.

Part 3 coming soon: What the forced stillness cracked open — and how the universe used it to rebuild me from the ground up.
`,
  },
  {
    slug: 'living-out-an-old-story',
    title: 'I Was Still Living Out a Story That Was No Longer Mine',
    subtitle: 'For as long as I can remember, a bad night’s sleep meant a bad day.',
    seoTitle: 'Living Out an Old Story: Catching the Beliefs I Still Run on Autopilot',
    description:
      'A sleepless night and a chat with a waitress showed me I was still running an old belief on autopilot, long after my life had changed. The story, not the sleep.',
    date: '2026-04-01',
    category: 'Healing',
    tags: ['limiting beliefs', 'autopilot', 'old stories', 'mindset', 'self-awareness'],
    image: { src: '/images/road/road-3.jpg', alt: 'A long sandy beach curving around a bay beside train tracks', pos: '50% 100%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’ve caught yourself living out a story that no longer matches who you are, these are the tools that help me slow down, ground myself and hear my own voice again.',
    text: `
🎧 “Candy” – Sonny Tennet

Last night I couldn’t get to sleep until 2am. Was it the full moon? The coffee I had too late? The fact that Mercury is probably in retrograde? I was ready to blame anything. But the moment I realised how late it was, my brain did what it always does, immediately started catastrophising about how terrible today was going to be.

I was tossing and turning, trying to force myself to sleep. I tried reading, meditating, sitting up, even tried telling myself stay awake, stay awake, don’t fall asleep, reverse psychology on my own brain. Like a child who suddenly desperately wants to sleep the moment you tell them they don’t have to.

None of it worked.

Part of me was getting pissed off. But another part of me was like girl, why are you trying to force something that clearly isn’t happening?

So instead I put Netflix on, probably the biggest sleep no-no there is, but I thought f*ck it, if I’m going to be awake I may as well enjoy it. I let go of my commitments for the next morning and gave myself full permission to stay up and sleep in.

Within half an hour, I was out.

It wasn’t the best sleep of my life. But I was asleep.

When I woke up, my mind went straight to autopilot.

Oh. Today is going to be a struggle.

I was in that anxious, off-kilter energy, you know the one. When you haven’t slept properly and you just feel… not right. I took my time, meditated, did some EFT tapping. Did my best to ground myself back down but it wasn’t easy.

Then I went for my morning coffee.

The waitress told me she was exhausted, she’d only slept two hours. And I was like, me too, except I actually had slept, I just didn’t feel like it.

But what she said next really made me stop and think.

She said she has to put on a smile even when she’s tired. That she has two faces, one in front of people smiling, and one behind closed doors completely exhausted.

And I thought — wow. That used to be me. Yet here I am in a completely new life, new reality and still playing the same story?

> I don’t have to live out that story anymore.

The lack of sleep had triggered an old belief. If I don’t sleep, I will struggle all day. And I was already playing it out on autopilot before the day had even started. My mind had gone straight to the old story without even checking whether it was still true.

But my reality is so different now.

I’m no longer a PT running back-to-back sessions, having to be up at 4am, running on empty just to get through the day. I now work when I want to work. I create my own days. So why am I still playing out the old story? It’s like I’m a character trapped in a book that’s already been rewritten.

The waitress who had to smile through exhaustion, that used to be me. And it made me realise: the lack of sleep wasn’t the problem. The story I attached to it was.

Bringing awareness to it. Clearing that stress from my body. Shifting the story to actually match my reality, that’s the work.

The universe literally put that waitress in front of me to show me something.

> My reality has already upgraded. But my internal operating system hadn’t caught up yet.

And it makes me wonder, what other outdated programmes am I still running without even realising it?
`,
  },
  {
    slug: 'losing-myself-in-relationships-codependency',
    title: 'I Spent Years Feeling Drained and Losing Myself in Relationships',
    subtitle: 'Knowing this sooner would have saved me so much confusion, so many tears, and a whole lot of wondering why it kept happening to me.',
    seoTitle: 'Codependency and Overgiving: Why I Kept Losing Myself in Relationships',
    description:
      'Feeling drained, overgiving and losing yourself in the people you love? What I learnt about codependency, where it comes from, and what actually helps.',
    date: '2026-04-02',
    category: 'Healing',
    tags: ['codependency', 'overgiving', 'losing yourself in relationships', 'people pleasing', 'inner child'],
    image: { src: '/images/road/road-1.jpg', alt: 'Lena crouching and hugging a black dog outside', pos: '40% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’ve spent so long tuned into everyone else’s emotions that you’ve lost the sound of your own voice, this was made for you.',
    text: `
🎧 “When the Party’s Over” – James Blake

I used to get so frustrated with myself. Why did I always feel drained? Why did I lose myself so completely in the people I loved? Why did some relationships leave me feeling more exhausted than fulfilled?

I didn’t have answers for a long time. I just knew something kept happening — in friendships, in romantic relationships, in family — and I couldn’t figure out how to stop it.

It wasn’t until I understood what was actually going on underneath it all that everything started to make sense.

## It started when I was young

Somewhere along the way, I felt like my needs weren’t being met. And when you’re a child who doesn’t feel seen or loved in the way you needed, you find another way to get that love.

For me, that meant pouring myself into the people who did give it to me. From a young age I found myself taking on other people’s emotions, being the one who held space, who made others feel better. It was how I received love and connection, through being needed. Becoming so enmeshed with others that their life was my life. I didn’t know that’s what I was doing. I was just a little girl trying to feel safe.

But that little girl grew up, and she brought her coping mechanisms with her.

In adulthood it looked like this: losing myself completely in relationships. Fast-tracking friendships from strangers to best friends overnight. Absorbing other people’s emotions, their stress, their anxiety, carrying it as if it were mine to carry. Always rushing in to save, to fix, to help. Staying in dynamics that didn’t make me happy, accepting breadcrumbs, settling for less than I deserved, because the fear of losing them outweighed the fear of losing myself. Giving and giving until I had nothing left, then quietly resenting the people I’d given everything to.

And it wasn’t just friendships. In romantic relationships it looked like losing myself completely in another person, their mood became my mood, their problems became my problems, their happiness felt like my responsibility. With family it showed up as carrying everyone else’s emotional weight, being the one who held it all together, the fixer, the peacekeeper. Always the one giving. Rarely the one receiving.

Codependency and overgiving go hand in hand, they’re two sides of the same coin. The overgiving is just one of the loudest ways the pattern shows up.

A few years ago I didn’t have the language for any of this. I just knew that certain people left me feeling hollow. That some relationships, romantic ones, friendships, even family, felt more like survival than connection. The word codependency had been thrown around, I’d heard it, I’d even recognised myself in it. But knowing the label didn’t fix anything. Nobody tells you what to actually do with it.

Ok, so I’m codependent. Now what?

## This is what I’ve learnt

First, it is not something to be ashamed of. Not even a little. Codependency isn’t a character flaw or a personality defect. It’s a coping mechanism you developed as a child because your needs weren’t being met. Your nervous system found a way to get love, and it held onto that strategy for dear life.

For me, the subconscious logic was: if I can help this person, they need me. And being needed, that was how I’d learned to receive love. So I kept doing it, in every relationship, with everyone. If they needed me, they’d love me. And if they loved me, they’d never leave.

So I overgave. And the other person overtook. And I blamed them for draining me, when really, we were both just getting our needs met in the only way we knew how.

The moment I understood that, I stopped seeing myself as a victim of my relationships. And I stopped seeing the other person as a villain.

> We were both just two people with unmet needs, finding each other.

Here’s what I also had to learn, the hard way.

Judging myself for it made it worse. Trying to avoid it made it worse. Getting frustrated every time I caught myself falling into the pattern? Made it worse.

The thing that actually helped was compassion.

When I notice myself slipping into codependent behaviour now, the compulsive texting, the urge to fix someone else’s problems, the feeling of being completely consumed by another person’s energy, I stop. I step back. And instead of spiralling into shame, I get curious.

What do I need right now?

Something that also really helped me was learning to check in with my body in those moments. Because when you’re deep in codependent behaviour, the back and forth texting, being pulled into someone else’s emotional spiral, your nervous system is not regulated. It’s overstimulated. Anxious, wired, that almost frantic energy that can even feel like excitement but really isn’t. Your body is in a stress response and it’s trying to tell you something.

So now when I notice that feeling, that buzzy, dysregulated, completely consumed by someone else energy, I use it as a signal. Not a reason to spiral into shame, but a cue to pause and come back to myself.

Because underneath the behaviour is always a need. And nine times out of ten it’s the same need that little girl had all those years ago, to feel loved, to feel safe, to feel seen, to feel like she’s enough.

So I give her that. I talk to myself the way I would talk to a child who was scared. I offer myself the love I was looking for in someone else.

## The question that changed everything

And then I ask myself one more question, the one that’s changed everything for me:

> How would my healthy adult self act right now?

That question creates a pause. And in that pause, there’s a choice.

Maybe it means slowing down a new friendship or romantic relationship instead of fast-tracking it. Maybe it means putting the phone down instead of texting back and forth all day. Maybe it means letting a friend sit with their own problems instead of rushing in to solve them, because their growth isn’t mine to manage. Not taking on responsibility for solving other people’s problems or easing their stress, because that is not yours to carry.

It’s not about being cold or closed off. It’s about recognising where you end and someone else begins.

Codependency isn’t a life sentence. It’s a pattern. And patterns, once you can see them clearly, can be changed.

You’re not too much. You just learned to love in survival mode.

And you can learn a new way.

Part 2 coming soon: The push/pull, why I started disappearing from the people I loved most when things got too close, and the thing that actually broke the cycle for good.
`,
  },
  {
    slug: 'work-life-balance-mindfulness',
    title: 'It’s Funny How the Very Thing I Spent Years Chasing Doesn’t Actually Exist',
    subtitle:
      'I was always trying to find the \'perfect\' work life balance. Turns out I was asking myself the wrong question the whole time.',
    seoTitle: 'Work-Life Balance Doesn’t Exist. Here’s What I Chase Instead',
    description:
      'I spent years chasing the perfect work-life balance. My Vipassana teacher showed me I was asking the wrong question: it was never about the schedule.',
    date: '2026-04-03',
    category: 'Wellness',
    tags: ['work-life balance', 'mindfulness', 'burnout', 'presence', 'Vipassana'],
    image: { src: '/images/road/road-5.jpg', alt: 'Feet up on a hillside, looking out over the sea at sunset', pos: '50% 40%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re chasing balance but still running on stress, these are the tools that help me slow down, ground myself and come back to the present moment.',
    text: `
🎧 “I’ll be missing you” – JH Marco

The question I’ve been trying to solve for so long is — what is the perfect balance of work and life? How can I achieve more balance between work and life?

This idea that there is a perfect balance. But what if the very question I’ve been asking myself is the wrong question? What if there’s a completely different way of looking at this altogether?

My Vipassana teacher said it’s not just about sitting in meditation all day. It’s about being able to do things mindfully. To bring presence into everything, the mundane, the ordinary, the everyday things we usually do on autopilot.

And that’s when it hit me. What if it isn’t about how can I achieve the perfect balance, but more about how can I bring more mindfulness into my day, into everything I do, into my everyday activities?

This whole time I’d been chasing something that maybe doesn’t even exist. The perfect balance I was looking for was never out there. What I actually needed was already within me. I just didn’t know it yet.

For the last couple of years I’d always say the same thing to my friends. I’m good, but I’m really struggling with finding the right balance between work and life.

There were days where I’d literally only work one or two hours, trying to give my body the rest it was clearly asking for. I could feel it, the tension, the dizziness, the exhaustion. So I’d cut back. But even on those minimal work days, because I was pressuring myself to get so much done in that small window, I was still operating in a high pressure, stressed state. And when I’d go to enjoy the rest of my day, I’d feel better for resting, but I was already depleted before I even started.

And I couldn’t understand it. I’d barely worked. I should be feeling good, energised, free. So why did I still feel like that? The guilt of it was almost worse than the exhaustion itself.

Here’s the thing. You can create a schedule that looks perfectly balanced on paper, sure. But if you’re moving through your day in a reactive state, checking every ping of your email, jumping at every notification, rushing through activities and tasks, chasing productivity, you’re spending a big portion of your day, your week, in a stressed state. You’re not truly present.

Which means no amount of balance in your schedule will solve this.

You may only work a few hours a day, but if in that time you aren’t mindful, you will still feel it. Tense shoulders, tired, low energy. The symptoms of stress. Maybe not to the extreme of a 10 hour day, but you still shift into that stressed state. And that’s not balance, that’s just a softer version of the same thing.

Which brings me to my point.

We need to learn to be mindful with everything that we do. The more present we are, the more energy we have, the more flow we feel. And flow equals happiness and freedom.

Which is exactly what I had been searching for from the perfect work life balance the whole time.

The thing I was looking for on the outside was always something I needed to cultivate on the inside.
`,
  },
  {
    slug: 'who-decided-monday-to-friday',
    title: 'Who Decided We Had to Work Monday to Friday and Spend the Weekend Recovering From It?',
    subtitle:
      'I\'ve been thinking a lot lately about who actually made these rules we\'re all living by. Here\'s what ChatGPT has to say...',
    seoTitle: 'Who Invented the Monday to Friday Work Week? Why I’m Questioning It',
    description:
      'Who decided we work Monday to Friday and spend weekends recovering? The surprising history of the five-day week, and why I’m living by my own rhythm.',
    date: '2026-04-09',
    category: 'Wild',
    tags: ['five day work week', 'Monday to Friday', 'breaking free from the system', 'living on your own terms', 'rest'],
    image: { src: '/images/road/road-6.jpg', alt: 'A lone tree by a still lake with hills behind', pos: '50% 60%' },
    offer: 'The Freedom Frequency',
    offerLine: 'If you’re starting to question the rules you’ve been living by, this is everything I learned going from stuck to building a life on my own terms.',
    text: `
I feel like we’ve been sold this idea that we must work Monday to Friday, 5 days a week, on those specific days, and then we’re allowed or rewarded with 2 measly days off.

It’s something I’d already started questioning a couple of years ago when I started cutting back my work days. Taking Mondays off, extending my weekends. But now it’s got me thinking more about the fact that we have this almost negative association with work days. It’s commonly a complaint — “ah I have to work,” “I don’t want the weekend to end,” “I don’t want to go to work on Monday.” It’s rare to hear someone genuinely excited about their Monday or their big week of work.

And it made me wonder, who even came up with this whole Monday to Friday, work days and weekends thing anyway?

So naturally I asked ChatGPT. And honestly the answer is wild…

“It’s completely made up. The Monday to Friday workweek isn’t some natural or universal way of living. It’s a structure shaped by religion, the Industrial Revolution and economic systems that prioritised productivity.”

Sunday became a rest day because of Christian tradition. Factory workers during the Industrial Revolution were grinding six to seven day weeks in brutal conditions. Labour movements fought back and introduced the eight hour workday. Then in 1926 Henry Ford made the five day forty hour week mainstream, not for the workers’ wellbeing, but because it boosted productivity and gave people time to spend money.

That structure spread globally. And we just inherited it. Without question.

And that right there just goes to show, we’ve been sold this idea that we must live our life this structured way. But we don’t have to.

I’m still figuring things out as I go. But what I’m moving towards is this, instead of forcing myself into a rigid Monday to Friday structure, burning out by the weekend and then spending two days recovering, what if I just listened to myself instead? Took rest when my body was actually asking for it. Worked when I felt energised and inspired. Lived intuitively rather than by a schedule that was never designed for me in the first place.

I’ve already broken free from the grind in so many ways, but the further along this journey I go, the more I realise there are still deeper layers to unlearn. This is one of them.

Building a life on my own terms isn’t a destination. It’s something I’m learning more about every single day.

Why would I need a designated day off from a life I actually love?

That’s what I’m experimenting with. And I’ll report back on how it goes.
`,
  },
  {
    slug: 'performative-energy-wearing-a-mask',
    title: 'When There’s Something I Need to Learn, the Universe Puts Certain People in My Path',
    subtitle:
      'It’s all about performative energy — the masks we wear, the versions of ourselves we perform, just to feel accepted.',
    seoTitle: 'Performative Energy: Taking Off the Mask We Wear to Feel Accepted',
    description:
      'As a PT in Bondi I wore the mask every day: happy, high energy, perfect. On performative energy, social media validation, and the freedom of being yourself.',
    date: '2026-04-11',
    category: 'Healing',
    tags: ['performative energy', 'authenticity', 'social media', 'people pleasing', 'Bondi'],
    image: { src: '/images/road/road-8.jpg', alt: 'A palm tree above a deep blue bay and green hills', pos: '50% 70%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’ve been performing for so long you’ve forgotten what it feels like to just be you, start here.',
    text: `
There’s something I’ve been noticing more and more, especially lately.

Fakeness. Performance. The gap between who someone actually is and who they’re presenting to the world.

And look, I get it. I’ve lived it for years. We all do to some extent.

When I was a personal trainer in Bondi, there was this unspoken rule that came with the job. You didn’t just have to be good at what you did. You had to look a certain way. Feel a certain way. Show up a certain way. Ripped. Happy. High energy. The picture of health — physically and energetically.

It’s like, if you’re teaching people how to feel good in their body, you better be the walking proof of it, right?

So no matter how exhausted I was, no matter how many alarms I’d set for 4am, I’d wake up and put the mask on. Smile. Be bright. Bubbly. Look good. Perform.

And honestly? It was f***ing exhausting.

The thing is, this isn’t just a fitness industry problem. We wear masks in so many areas of our lives — at work, in relationships, on social media. Anywhere we feel like we have to show up a certain way to be accepted, liked, seen.

And a lot of that starts way before we’re old enough to question it. From a young age we’re told: be a certain way, learn a certain way, do life a certain way. To be a good student you must…. To be successful you must… All these expectations and shoulds and rules slowly pile up. And somewhere along the way we start to believe that if we’re not performing this version of ourselves, we won’t be accepted. We won’t be good enough. We won’t be loved.

Which cracks open a whole other level of insecurity and comparisonitis. Because when you’re wearing a mask, you’re never quite sure who you are without it.

Social media has made all of this so much bigger.

And honestly, I was deep in it. As a PT, the way I showed up online. I used to post every single day — for views, for engagement, for my ‘business’. But also, if I’m being really honest, on some level, for validation. That little dopamine hit of people see me, people like me. And that incessant need to check how my post was performing after hitting publish? Yeah. I know that toxic trap really well…

Taking the majority of the year off social media has allowed me time to step back and reflect — why am I posting?? Am I doing this for me? Or am I trying to get a need met? Even now, sometimes I’ll post something and afterwards sit with it and think… what was I actually needing in that moment? Because when a post doesn’t feel authentic, there’s usually something underneath it. A need to be seen. To feel enough. To perform.

Here’s the thing though, and this gave me so much compassion for myself when I learned it — social media platforms were deliberately designed to keep us hooked, and they actually modelled pokie machines to do it. The likes, the comments, the notifications, they’re all a system of intermittent rewards, built to capture your attention and keep you coming back. So even when we’ve done the work, even when we’re no longer consciously seeking validation, we’re still human. We can still fall into the habit. And that’s not weakness, that’s by design.

The highlight reel we scroll through every day has completely warped our baseline. We see someone’s ‘perfect’ version of themselves and suddenly we feel like we’re falling short — not doing enough, not looking enough, not being enough. And the cycle continues...

Coming to Bali, moving into a slower culture where presence is actually the norm, it’s made the performance even more visible when I do see it. Like a contrast I can’t unsee. I notice the fakeness in others more clearly now. The inconsistency in moods and needs. The way people’s energy shifts depending on who’s watching.

But here’s the thing, that noticing could easily become judgment. And sometimes it does. But then I remember compassion. Because I know how heavy that mask is. I wore it for years. And everyone is just out here doing their best.

Certain people will be inconsistent with how they show up toward you, and a lot of the time it actually has nothing to do with you. They’re just getting their needs met. They’re performing. They’re exhausted by it too. The more compassion we can hold for that, the more peace we find.

Taking the mask off in my own life has taught me a few things.

I can see inauthenticity pretty quickly now — not from a place of judgment, but recognition.

Showing up on social media as myself - not this polished, perfect version, not posting for validation or to be seen a certain way — takes real mindfulness. Unlearning old habits doesn't happen overnight. But it’s the most freeing thing I’ve done.

And I want to be real with you - I still notice myself putting the mask back on sometimes. I’ll be in a moment and then afterwards catch myself like… oof, that wasn’t me. I didn’t like how I acted there. That didn’t feel authentic. But the difference now is I notice it so much quicker. And that awareness, bringing attention to it. That’s how you break free from the pattern. That’s the growth. It’s not about being perfectly unmasked all the time — it’s about building enough self-awareness to catch yourself and come back.

So wherever you are at right now - maybe you’re exhausted from performing. Maybe you’ve been showing up a certain way for so long you’ve forgotten what it even feels like to just… be you.

That’s okay. You don’t have to figure it all out at once. Just start by noticing.

Just know — it’s safe to be yourself. Not everyone will like you, and that’s okay. The right people will love you and accept you exactly as you are. And with them, you won’t need the mask.
`,
  },
  {
    slug: 'perfectionism-feeling-behind-in-life',
    title: 'You Know That Constant Feeling Like Time Is Running Out?',
    subtitle:
      'That lowkey pressure - like you\'re behind, not doing enough. People your age are buying properties, running a business while popping out another baby, celebrating 10th wedding anniversaries. And I\'m living out of a suitcase, hopping around Southeast Asia.',
    seoTitle: 'Feeling Behind in Life at 38? How Perfectionism Was Running the Show',
    description:
      'Feeling behind at 38 while friends buy houses and have babies? How I found the perfectionism underneath, and the Ho’oponopono practice I use to let it go.',
    date: '2026-04-17',
    category: 'Healing',
    tags: ['perfectionism', 'feeling behind in life', 'comparison', 'inner child', 'Ho’oponopono'],
    image: { src: '/images/road/road-3.jpg', alt: 'A long sandy beach curving around a bay beside train tracks', pos: '50% 100%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If that quiet pressure is running in the background of your life too, these are the simple practices I use to slow down and come back to myself.',
    text: `
And at 38, It can be hard not to compare and not to feel you’re behind. Even if I back my choices completely. I genuinely love my life. And if I’m really honest I don’t even know if I actually want what they have, at least not yet anyway. But that doesn’t stop the thought creeping in - should I be further ahead by now? Even when rationally I know this is exactly the life I chose and the life that’s meant for me, that old conditioning, that old belief system, finds a way in.

What I didn’t realise until recently is how much that feeling is actually tied to perfectionism.

I always knew I was a perfectionist. But I think I’d only ever scratched the surface of what that actually meant. It’s only now, unpacking all of this, that I’m starting to see just how much that one label has been quietly tied to everything - the time pressure, the exhaustion, the constant need to be on, to be performing, to always be “good.”

It’s been running the show for a long time. I just didn’t know it.

I’m starting to realise just how much pressure I’ve been unknowingly putting on myself. This quiet, constant pressure running in the background that I’ve been lowkey disregarding, not fully acknowledging, because I’m a perfectionist.

And the tricky thing about being a perfectionist is that you don’t always see it as a problem. You just think you have high standards. You think you’re driven. You think this is just who you are.

In my last post I wrote about performance energy and putting on an act to be accepted by others. I feel like perfectionism and performance are two ends of the same string. One feeds the other. And I’m only just starting to see how deep that string actually goes.

The symptoms of this show up in ways I’m only just starting to name.

That constant feeling of running out of time. Always behind, always catching up, never quite done. Even when I’ve had a full, productive day, somehow it never feels like enough.

Almost getting concerned when I have a really great day - productive, good training, good balance of socialising, mindfulness and flow - because I know I’ll want to replicate it the next day. And I already know I won’t be able to hit that same level of satisfaction. So even a good day comes with its own quiet pressure. Even joy becomes something to perform.

Putting time pressure on myself to be focused and productive. And my body physically responds - tight shoulders, dizziness. A stressed state. These are all little subconscious things I’m doing to myself without even realising, and my physical body is the one paying the price.

Feeling like I don’t have time to stop and chat. Like I’m always somewhere to be, something to do. Always on.

And then there’s this one - putting pressure on myself to feel good and be positive and bubbly every day. Because this is who I am. But it’s also not realistic to be upbeat every single day. Nobody is. And instead of showing people the low version of me, I’d rather hide away. Which probably makes it worse. Holding such a high standard for myself and then feeling bad about not being high vibe, like even my emotions have to be perfect.

And if any of this sounds familiar - the tight shoulders, the low level stress even on a light day, the feeling that you don’t have time to stop or breathe, like there’s always something more you should be doing - you’re probably not imagining it. This is what perfectionism actually looks like when it’s running quietly in the background of your life.

And it turns out, this isn’t just me.

Psychology actually backs this up. Perfectionism is strongly linked to toxic comparison - seeing others outperform us, especially at things relevant to our own lives, directly impacts self-esteem and fuels that “not doing enough” feeling. (Psychology Today)

Research also shows that perfectionists tend to live with a moving goal line - as soon as one goal is met, a higher one takes its place. Success rarely feels satisfying, leading to chronic exhaustion and a constant sense that nothing is ever enough. (Psychology Today)

And social media makes it worse. Seeing others’ highlight reels - the investment properties, the babies, the milestones — reinforces the belief that anything less than that is failure. It fuels obsessive self-monitoring and an overwhelming fear of being judged, even when rationally we know we’re comparing our behind-the-scenes to everyone else’s best moments. (Counseling Today, 2025)

Which means that feeling of time running out, the comparison to where others are at, the pressure to always be performing - it’s not a personal flaw. It’s not weakness. It’s what perfectionism actually looks like when it’s running quietly in the background of your life.

Even as I write this now, I had a thought - you don’t have time to be doing this, you should be working. This isn’t flowing.

And yeah, of course it’s not flowing. Because I’m feeling guilt, time pressure, and a head full of shoulds.

And just as I was about to put the pen down, I stopped myself.

Where has this pressure to perform come from? This pressure to be productive, to be perfect - where did it even start?

Let’s unpack it.

As a kid I remember being the black sheep of the family. The third child. On some level I felt forgotten about. And I was always scared of getting in trouble.

So that’s probably where this need to be perfect started. If I wasn’t “good”, I’d get in trouble. So I learned to be good. Or at least look like it.

At school it showed up the same way - flying under the radar. I was naughty but managed to uphold the “good girl” exterior. Nobody really knew. With boyfriends, with work, always trying to not get in trouble. Always performing. Always managing how I was perceived so I could stay safe.

The common theme running through all of it: having to be perfect so I don’t get in trouble. And if I get in trouble, I’ll be punished and I won’t be loved.

And that’s it, right there.

Fear that if I’m not perfect, I will be unloveable.

I literally just learnt this about myself right now, here, writing these words. Not in therapy, not after years of reflection - just now, in this moment, with you. And that’s the thing about writing honestly - sometimes the truth just falls out of the pen before your brain has a chance to catch up.

So cool. Now we have that information - then what?

Now it comes down to bringing awareness to the times I’m being a perfectionist. And when you can bring awareness to it that’s when you can change it.

When I feel that pressure, that perfectionism creeping in, I stop. I bring compassion and I talk to my inner child with kindness.

> “Oh little Lena, you’ve fallen back into that old belief again. It’s ok.”

I acknowledge it. Then I use Ho’oponopono (A Hawaiian healing practice.)

> I’m sorry. Please forgive me. I love you. Thank you.

I feel it clear by saying those words. I close my eyes. I visualise giving my inner child a hug. See the love, bring the compassion.

And then I act in a way that a non-perfectionist would.

Take away the time deadline. Let the task go completely - come back to it later, or whatever you were doing that triggered it. Let it go. Or do it while being mindful, without the pressure attached.

Because here’s the thing. The task was never really the problem. The story attached to it was.

I used to just avoid these discomforts. Push through, perform, hide the low days, and quietly wonder why I always felt like I was running on empty. But over my years of healing, from all of my learnings, I’ve picked up pieces along the way, and this is how I heal. This is how I break the patterns that have been holding me back for so long.
`,
  },
  {
    slug: 'why-we-judge-others-ego-compassion',
    title: 'I Caught Myself Thinking, “This Trainer Has No Idea What She’s Doing”',
    subtitle:
      'And that stopped me. Why was I judging her?',
    seoTitle: 'Why We Judge Others: What a Pilates Class Taught Me About Ego',
    description:
      'Mid Pilates class I caught myself judging the trainer. What judgement really says about us, the neuroscience of ego, and how compassion sets you free.',
    date: '2026-04-24',
    category: 'Healing',
    tags: ['judgement', 'ego', 'compassion', 'inner child', 'perfectionism'],
    image: { src: '/images/road/road-9.jpg', alt: 'Lena and a friend taking a selfie on a scooter', pos: '50% 50%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re ready to catch the old patterns and meet yourself with more compassion, this is where I’d start.',
    text: `
Being an ex personal trainer, I always walk into any class with high expectations of the trainer. Actually, in any environment where I have some skill, it’s like I’m instantly scanning for flaws. It just automatically happens.

Mid class I got frustrated about an exercise. It felt wrong, I wasn’t feeling it in the right spot. And I kept noticing her stumbling over her words. I found myself thinking she didn’t know what she was doing.

Instead of focusing on my own training, I was completely focused on her ‘stuffing up’.

And then I caught myself.

I said to myself - let’s focus on what she’s doing well rather than where she’s falling short.

She had great visual cues. Positive energy. She was genuinely doing a good job.

Yesterday I watched a video by Aaron Doughty that landed. He said, when you find yourself shrinking, (even though I felt superior in the moment - another form of shrinking) try to see their inner child instead. How would you treat this person if they were a child standing in front of you?

Because here’s the thing. I wouldn’t have said I felt intimidated by her. Not consciously. But when I really sat with it - my ego did feel threatened on a level I wasn’t even aware of in the moment.

And that’s the subtle thing about judgement that most people miss.

Conscious intimidation feels like smallness - like they’re better than you. But subconscious ego threat looks completely different. It shows up as superiority. Criticism. Needing to find the flaw. Putting someone else down quietly so you can feel a little more above them. The feeling isn’t “I feel less than her” — it’s “she doesn’t know what she’s doing.” But underneath both is the exact same root. A quiet fear of not being enough.

Judgement is just ego’s defence mechanism. And I hadn’t even realised mine had kicked in.

And when we judge others, it says nothing about them and everything about us. It means there’s something unhealed in me that’s being reflected back.

I judged her because I hold those exact same high standards and expectations on myself. Especially when I was a trainer. Especially when I was learning something new. Her stumbling triggered something in me that recognised itself.

It had nothing to do with her.

It was my own perfectionism being mirrored back at me.

And when I find myself thinking someone isn’t good enough at something - underneath that is this quiet need to feel worthy. Better than. Like if I put someone else below me, I finally get to feel like enough.

But that’s just ego. And ego is a low vibe state.

When we’re in ego, we’re in a contracted state - closed off, defensive, reactive. And neuroscience actually backs this up. When the ego is running the show, it activates the brain’s default mode network — the part responsible for self-referential thinking and social comparison. An overactive ego creates defensive neural patterns that keep you stuck, resistant, and interpreting the world as a threat to your identity.

Essentially, judgement puts your brain into a mild stress response. It keeps you small. Contracted. And when you’re contracted, you’re blocking yourself from receiving - good energy, connection, growth, all of it. You literally cannot be open and judgemental at the same time.

Compassion does the opposite. It activates the prefrontal cortex - the part of your brain responsible for higher thinking, empathy and emotional regulation. One expands you. One shrinks you.

Sure, it helps to analyse why we’re thinking or acting in certain ways - awareness is always the first step. But a lot of the time it really just comes down to this.

Seeing each other as equals. As each other’s inner child.

We’re all out here doing our best with where we’re at. Nobody is above or below. We are equal.

And if putting someone down made me feel enough - it doesn’t. It just makes me feel worse. And it sends that energy straight back out into the world.

> Judgement keeps you small. Compassion sets you free.

So I chose to see her as her inner child. I focused on what she was doing well. And that combination softened me completely.

I left that class feeling good about her. And good about myself.

Because when you can shift your perspective from the flaws, the judgement and choose to see the human instead, everything changes. Not just for them.

But for you.

And that’s where the real freedom is.
`,
  },
  {
    slug: 'spiritual-burnout-productivity-trap',
    title: 'The Productivity Trap Just Has a Prettier Mask Now',
    subtitle:
      'I thought I was doing all of the right things, turns out - the productivity trap just has a prettier mask now. It pulled me back in without even realising it.',
    seoTitle: 'Spiritual Burnout: When Wellness Becomes Another Productivity Trap',
    description:
      'Alarms, time-blocked meditation, scheduled healing. How hustle culture snuck back in dressed as wellness, the signs of spiritual burnout, and my way back.',
    date: '2026-05-09',
    category: 'Wellness',
    tags: ['spiritual burnout', 'productivity', 'hustle culture', 'flow', 'nervous system', 'Bali'],
    image: { src: '/images/lena-sunrise.jpg', alt: 'Lena at sunrise above the clouds', pos: '65% 45%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re exhausted but can’t work out why, and stillness has started to feel uncomfortable, start here: five days of simple practices to come back to yourself.',
    text: `
For the past two weeks I’d been struggling - with balancing life, work. Feeling like I couldn’t get everything done. So I started bringing more structure to my days again. Setting alarms. Planning when to go to the gym, when to work, which days for which tasks.

And then my brother said something that finally hit. He said: ‘you’re doing the busyness thing like mum. but with spirituality, soul nourishing things.’

I laughed so hard. And then I wanted to cry. Because he was absolutely right.

It’s chasing productivity - doing more - just in a prettier mask.

Here’s what it looked like from the inside:

I was physically burnt out but couldn’t understand how - because I was taking care of myself. I’d dropped back into low, heavy, depressive thoughts I hadn’t felt in a really long time. I had migraines. My sleep was broken. I was constantly running out of time even though I was endlessly planning my time. I was bloated, run down, couldn’t even do life admin or get my groceries done, was reading obsessively to escape my own head.

And the spiritual symptoms? Those were the ones that really scared me.

I couldn’t drop into meditation anymore. My intuition went completely quiet - like a signal that just... cut out. And the thing that broke my heart most: I was getting bored doing nothing. I used to be someone who could sit in a cafe all day and feel completely full. Suddenly stillness felt boring?

That’s when I knew something was off.

Here’s what had happened.

Before all of this, I’d been living in genuine flow. No alarm clock. Moving through my mornings slowly. Working in the afternoons when my body felt ready. Running because I wanted to, not because it was in the schedule. Sitting in cafes. Writing. Being off socials. Doing things mindfully rather than efficiently.

And it was working - I felt good, I felt clear, my energy was magnetic.

But then business frustration kicked in after seeing a social media post of someone doing really well with their business. That quiet, creeping feeling of I’m not doing enough, I’m not growing fast enough, I need to be more structured. And I did what every recovering good girl and high achiever does: I tried to control my way to safety.

Alarms. Time blocking my days. Specific tasks for specific mornings. Gym at this time, flow and deep work at that time, meditation, journaling, oracle cards, learning bahasa, healing sessions (all with time constraints).

It felt productive. It looked responsible. It was dressed up in the language of honouring my energy - but it was the opposite. It was fear wearing a wellness costume.

And neuroscience actually backs this up - when we chronically override our body’s natural rhythms with external structure and urgency, we keep our nervous system in a low-grade stress response. Cortisol stays elevated. Creativity drops. Intuition - which lives in the quieter, parasympathetic state - goes offline. We’re literally neurologically less capable of the things we’re trying so hard to force.

So the more I scheduled, the less I could access. The more I pushed, the further I got from myself.

## So how do you actually pull yourself out?

Honestly? You don’t push your way out. You remember your way back.

I sat with this question: what did my days look like when I was actually flowing?

And I wrote it out - not as a new schedule to implement, but as a felt sense to return to. No alarm. Slower mornings. Working when it felt right, not when the calendar said to. Writing because creativity was flowing out of me. Sitting somewhere and just... being there. Moving my body intentionally and for fun, not output. Getting off my phone.

> The antidote to spiritual burnout isn’t more practices. It’s less performing of them.

If you’re reading this and something is resonating - if you’re exhausted but confused why, if your intuition feels quiet, if stillness has started to feel uncomfortable - I want to ask you:

Are you actually resting? Or are you optimising your rest?

Are you actually in flow? Or have you built a very beautiful, very exhausting system around what flow is supposed to look like?

Because hustle culture didn’t disappear when we became more conscious. It just adapted to the new version of us.

And the moment we catch it - bring awareness to it and change our behaviour - is the moment we can actually choose something different.

This week, I took the alarms off. I’m writing this from a cafe. I didn’t plan to come here. It just felt right.

That’s the whole thing, really.
`,
  },
  {
    slug: 'bad-start-bad-day-story',
    title: 'Bad Start = Bad Day. I Realised I’ve Been Running This Story for 38 Years',
    subtitle:
      'The neuroscience behind why one bad thing hijacks your whole day — and the 4-step process that flipped a potential write-off of a day into a great one in under 5 minutes',
    seoTitle: 'Bad Start, Bad Day? The 4 Steps I Use to Turn a Day Around',
    description:
      'Why one bad thing can hijack your whole day (negativity bias and your brain’s filter) and the 4-step process I used in a Bali café to turn it around.',
    date: '2026-05-14',
    category: 'Healing',
    tags: ['negativity bias', 'mindset', 'ADHD', 'gratitude', 'self-compassion', 'Bali'],
    image: { src: '/images/road/road-2.jpg', alt: 'Lena on a scooter on a jungle road, arm raised to the sky', pos: '50% 35%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you want more tools to catch the story before it writes your day, these are the ones I come back to.',
    text: `
Where did the saying even come from? “Woke up on the wrong side of the bed.”

I’ve been thinking about this because this morning I caught myself running a story I didn’t even know was a story. I thought it was just reality. The way days work. Bad start = bad day. The domino effect. One thing goes sideways and suddenly you’re collecting evidence all day to prove it was always going to go this way.

You wake up in a panic. Slept through your alarm, grab your phone — fck, I’m late. Stub your toe on the bed frame. Toast in mouth, running out the door. Hop in the car ready to fly and there’s a fcking garbage truck blocking the whole road. Whole day written off before it even started.

This morning it showed up differently, more subtly. My Grab driver’s energy was really off.

And I could already feel the story coming up. Even though I was trying to push it down. The fear was there: oh no, low vibe things are happening... does this mean I’m going to have a bad day?

Then I sat down, took one sip of water and choked so dramatically — tears streaming, sweating, strangers staring, disrupting the peace in a very quiet, chill cafe.

And that was it. Old program fully booted.

“See. I knew it. Bad start = bad day.”

Part of me genuinely wanted to validate it. To say yes, this is evidence, this confirms the story. To let the day be written off and just get through it.

Instead I opened this journal. And I started writing.

The first question I asked myself: what is the common denominator in all of this?

Me. Not the driver. Not the rubbish truck I’d clocked on the way. Not the universe being against me. Me and the story I decided to run the second something went sideways.

And then I got curious about it. Not judgmental. Just curious. Interesting. Where does this even come from?

As an ADHD person I feel the extremes of everything. Highest of highs, lowest of lows. And I genuinely love to spiral. So part of this is just how I’m wired. But part of it is also 38 years of collected data, my own experiences layered on top of a cultural story we’ve all been handed and never questioned. I threw my own spin on it, stacked evidence on top of evidence, and turned “woke up on the wrong side of the bed” into a self-fulfilling prophecy running on autopilot every single day.

It’s like having an iPhone 17 Pro Max but still running software from your first phone a Nokia 8210. The hardware upgraded but the program never did.

## Why our brains do this

There’s actual neuroscience behind it and understanding this helped me so much.

It’s called negativity bias. Our brains are wired to give more weight to negative experiences than positive ones. It’s an evolutionary survival mechanism. Back when we were dodging predators, noticing threats kept us alive. But in 2026, the threat is a garbage truck and a Grab driver with a bad vibe, and our nervous system still responds like it’s life or death.

On top of that, the moment you decide it’s a bad day, your Reticular Activating System, the brain’s filter, starts finding evidence everywhere to confirm that decision. Your brain is literally curating a bad day highlight reel to prove you right.

And if you’re an ADHD girlie like me who feels everything at the extremes and genuinely loves a good spiral? This hits even harder. Because once the story starts running, it runs fast.

So I did something right there in that cafe. Four steps, in my journal, as I was writing this out. And by the time I was done my whole day had shifted.

## Step 1 — Awareness

Notice you’re running the story. That’s it. No judgment, no fixing it yet. Just see it for what it is — a story. A program that’s been running on autopilot. The moment you name it, it loses power. You can’t change what you can’t see.

## Step 2 — Compassion

This is the step people skip and it’s the most important one. Don’t shame yourself for running the story. Your nervous system learned this pattern to keep you safe. It was doing its job.

I literally wrote this to myself: “My beautiful girl, I’m so sorry you felt you still needed to play out this story. You are safe. You are more than enough. I offer this story up to the divine — please take it from me.”

You can use mine or write your own love note. Whatever words you feel you or your inner child need to hear.

## Step 3 — Offer it up

Visualise holding that story in your hands and giving it to the universe. Watch it dissolve in white light.

## Step 4 — Redirect

Check your behaviour. Align it with the abundant version of yourself. And Name three things you’re genuinely grateful for right now.

I did it sitting in the cafe I’m in, like right now in this very moment. I appreciated the yummy coffee I was sipping on, the beautiful little life I’ve created for myself here in Bali, and my beautiful self awareness.

I felt real gratitude in my body and that’s it. DONE.

The day I thought was a write-off before 9am? Already shifted into complete abundance by the time I closed this journal.

Not because anything changed out there. Because I caught the story, rewrote the script before it wrote the rest of my day for me.
`,
  },
  {
    slug: 'avoiding-men-im-attracted-to',
    title: 'The Hot Guy. The High Threat Man. I Was Avoiding Him Like the Plague',
    subtitle:
      'I called it "not feeding his ego." Turns out this is what was actually going on.',
    seoTitle: 'Why I Avoided Men I Was Attracted To (and What It Really Meant)',
    description:
      'I thought ignoring the hot guy was “not feeding his ego”. It was self-protection: rejecting him before he could reject me. On self-worth and fear of love.',
    date: '2026-05-27',
    category: 'Healing',
    tags: ['dating', 'self-worth', 'fear of rejection', 'inner child', 'nervous system'],
    image: { src: '/images/road/road-1.jpg', alt: 'Lena crouching and hugging a black dog outside', pos: '40% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’ve been abandoning yourself to stay safe, start by coming home to your body. These are the practices that help me do it.',
    text: `
You know when you see the hot guy at the gym and you instantly go from your confident, full self into a no eye contact, avoidant weirdo? Acting like this man has an AVO out on you. Maintaining a 5 metre radius at all times. Suddenly hyper aware of your every move, overthinking every single thing you do.

Yepp. I know this scenario a bit too well.

For the last seven days, the universe kept putting the same type of man in front of me. At the café. At the class. At the restaurant. Multiple times a day, for a week straight. I felt the discomfort every single time, this weird tension I couldn’t name, but I had no idea what was actually going on. Until I sat down and started writing this. And then it all came flooding out.

When you don’t learn a lesson, the universe will make it more and more obvious until you can no longer ignore it.

I’ve always had guy friends. Or more accurately, I’ve always easily made friends with guys. But over the years I noticed these men were all low threat. And by low threat I mean: they weren’t an option for me romantically. Either I genuinely wasn’t attracted to them in that way, or they were already in a relationship.

A lot of my guy friends are attractive, sure. But I’m not interested in them like that, genuinely and because of that, I can be my full, complete self around them. Just like I would be with a girlfriend.

Over the years, especially with newer friendships, this got me into some very awkward situations. Because I’m so unapologetically me around them a lot of the time, the single ones would get the wrong idea, that it was “more” than friends. Which always frustrated me, because for me I was just being myself, being friendly. And the guy would always seem to get the wrong idea. A lot of the time it even ended the friendship, or we’d become a lot more distant.

Now let’s look at the high threat man.

This is the hot, good looking man. Or more accurately, the man I’m attracted to. Because it’s not purely about appearance. The moment I clock that a man is attractive to me, whether that’s his face, his energy, the way he carries himself, something in me immediately categorises him as a threat. Before I’ve even spoken to him. Before I even know anything about him.

For as long as I can remember I’ve been avoiding eye contact with this type of man. Not giving him any attention. I could see him from my peripherals, but I would completely ignore him. And the whole time I thought I was in control here. I genuinely believed I was doing this to not feed their ego. To not be another woman drooling over them.

But I’m now realising this whole damn time, what I thought I was doing, was actually my way of protecting myself. Closing myself off completely to the high threat man. Taking myself out of the equation before they ever had the opportunity to reject me.

This whole time I was abandoning myself.

As I write this, figuring it out in this very moment with these very words, I have tears in my eyes sitting in this café. Because how incredibly, heartbreakingly sad it is, that this whole time I’ve felt I needed to protect myself from a potential romantic connection. Rejecting them before they could reject me. My self-worth so unconsciously low. Feeling so unworthy that, unconsciously, that’s how I would react to a man.

My poor, beautiful soul. This whole time she was abandoning herself just to stay safe.

There’s actually neuroscience behind this too. When the brain perceives a situation as high-risk, social rejection, vulnerability, potential humiliation, the amygdala fires a threat response. The same one triggered by physical danger. So my nervous system had literally learned to treat an attractive man like a threat to my survival. I was using avoidance as a protection strategy and my body had been running on autopilot.

Something Aaron Doughty said recently, really sank in: when you notice this pattern, act like they’re your best friend. Not in a fake way. But energetically, approach them with the same ease, the same warmth, the same lack of agenda you’d bring to someone you already feel completely safe with. Essentially: short-circuit the threat response before it takes over.

Which I’m sure is easier said than done but it really would help to ease that anxiety.

This entry is such an epiphany for me. I was aware of the behaviour this whole time but I had no idea what it meant. Until now.

A 38 year-old woman who has been, without realising it, protecting herself from love. Reflecting on the last few years I went from choosing unavailable men, to settling for the almost-it’s, to now showing complete disinterest before a man can even say hello.

This whole time, abandoning myself before anyone else got the chance to.

My poor little inner child. She just wants to be loved. Fully. Safely. Securely. Wholly.

So where do I go from here? Honestly, I’m still figuring it out as I go, this realisation is literally hours old.

But I know where to start. First, the body. Somatic work — actually feeling the emotion. Finding where it’s stuck in my body and releasing it. Because this pattern doesn’t just live in my mind, it lives in my nervous system.

Then the inner child work. Going back to the part of me that decided she wasn’t worth the risk of being seen. Sitting with her. Telling her she’s safe now.

True self love. Not the surface kind. The kind that actually rewires the belief that I need to disappear before someone gets the chance to reject me. Giving my nervous system the safety she’s always deserved.

And then actually changing how I show up. Making eye contact. Being warm. Being fully, unapologetically me around a man I find attractive, the same way I’ve always been around the ones I don’t. No more performing. No more shutting down. No more abandoning myself on autopilot.

When was the last time I was able to do that?

→ Never.

But there’s a first time for everything.

So I’m ready to heal this once and for all.

Come at me, hot man. 😏
`,
  },
  {
    slug: 'trust-your-intuition-stop-abandoning-yourself',
    title: 'When It’s Time to Level Up, the Universe Is Relentless',
    subtitle:
      'It will throw the wildest things at you, repeatedly, until you listen and learn the goddamn lesson. Right now my test is learning to be my true self and not abandon myself. Especially around men.',
    seoTitle: 'Trust Your Intuition: Learning Not to Abandon Myself Around Men',
    description:
      'The universe kept sending the same lesson in different cafés: trust what you already know, stop seeking validation, and show up as your whole, true self.',
    date: '2026-05-28',
    category: 'Healing',
    tags: ['intuition', 'self-worth', 'validation', 'dating', 'self-abandonment'],
    image: { src: '/images/road/road-2.jpg', alt: 'Lena on a scooter on a jungle road, arm raised to the sky', pos: '50% 35%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you want to hear your intuition more clearly, slowing down is where it starts. These five days are how I do it.',
    text: `
About a month ago, an unaligned man walked into my life.

I was sitting peacefully at a restaurant, minding my own business, when he came over and asked me how my salmon was. Seemed harmless enough. But my nervous system flagged something was off straight away. It wasn’t butterflies or excitement. Just this jittery, uncomfortable feeling that told me something wasn’t right. And then I clocked him staring at my boobs. Huge ick.

I answered him politely, he left, and I thought that was that.

But here’s what I noticed after he walked away. I went from sitting there quietly and peacefully to suddenly becoming socially louder. Sparking up conversations. Laughing a bit too much. Subtly peacocking. I was still being myself but there was this extra layer, like something in me had been triggered to perform. I couldn’t fully name it at the time. I just clocked it and filed it away.

A month passed. I’d almost forgotten about him.

And then there he was again. Same place. And this time I wanted nothing to do with him. No eye contact. No engagement. The boob staring, the ick feeling, the weird performance it triggered in me. I remembered all of it.

But here’s the interesting part. Even though I felt all of that, there was still this quiet little whisper underneath it all. This subtle pull wanting him to notice me. To validate me somehow. Even when I genuinely didn’t want him, some part of me still wanted to be seen by him.

I clocked it. Didn’t love it. But I clocked it.

He ended up chatting to my friend from across the restaurant. I turned to acknowledge him and he blanked me completely. I saw him outside afterwards, smiled, and got a death stare in return.

And I was like... ok then. 😂

This push pull was interesting to sit with. I didn’t want to engage with this man at all. And yet on some unconscious level I still wanted his approval. Even from someone who gave me the ick from day one.

Fast forward to this week. I’ve been doing a lot of inner work around men, love and self worth. Really bringing my patterns to the surface. The most recent being what I wrote about in my last post, the high threat man. The attractive man I would automatically avoid, ignore, shut down around. Not because I wasn’t interested, but because unconsciously I was rejecting him before he ever got the chance to reject me. A protection mechanism I’d been running on autopilot my entire life. (If you haven’t read that one, link is in my bio.)

So. The universe, being the absolute character that she is, decided it was time for a test.

My intuition nudged me to go to a café that was a little out of the way this morning. I almost talked myself out of it. But I listened. I walked in.

And there was boob starer. On a date. LOL.

And I noticed something. Almost immediately I had the urge to take off my big baggy t-shirt. I was just about to when I stopped myself. Why do I want to do that? To look more desirable? For him? And that’s when I caught it. I chose to change my behaviour. Because even for a man I didn’t even want, the old pattern was right there, ready to fire. Bringing awareness to it and choosing differently — that’s how you start to step out of old conditioning.

I wasn’t sure what to make of it at first. Why does this guy keep showing up? What is the universe trying to show me?

And then it clicked as I sat there. Because in that encounter I turned to look at him, tried to make eye contact, tried to smile. Twice. And twice he looked away from me.

And I thought, I don’t need to keep trying here. My intuition knew from the very first moment something was off about this man. My nervous system knew. The boob staring confirmed it. And here he was on a date, loud and performative. Everything my gut had already told me was being confirmed in real time.

Maybe that was the lesson. Trust what you already know.

But then, right in the middle of all of this, something else happened.

The hot guy from the café walked in. The one I would normally clock from my peripherals and immediately go into full avoidance mode around. No eye contact. 5 metre radius. Suddenly hyper aware of my every move.

Except this time I looked him right in the eyes and smiled.

And he did a double eyebrow raise back.

And I was like... wow. That was so easy. That felt so good. To just be myself.

It wasn’t really about him specifically. It was about the fact that for the first time I didn’t abandon myself the moment an attractive man walked into the room. I didn’t shrink. I didn’t shut down. I didn’t run the old protection strategy on autopilot.

I just showed up. As me.

And that is what true self worth actually feels like. It’s not just the self talk or the practices. It’s the moment you act differently. When you choose yourself so naturally you almost don’t even notice you did it.

The universe is wild. She will keep sending you the same lessons dressed up in different people, different cafés, different situations until you finally get it.

Trust your intuition. It knows before your mind does.

If you find yourself seeking validation from people who were never meant for you, don’t be hard on yourself. You’re only human. We all do it, clearly. But it’s about noticing it, questioning it, and choosing differently. That’s where the shift happens.

And show up as your whole, true self. Especially in front of the people who scare you the most.

That’s where the real healing lives.

🤍
`,
  },
  {
    slug: 'triggers-are-clues-healing-core-wounds',
    title: 'POV: You’re Single AF and See Loved Up Couples Everywhere You Go',
    subtitle:
      'What if instead of finding it cringe — you saw it as the universe showing you what\'s coming in for you?',
    seoTitle: 'Triggers Are Clues: How Three Small Moments Led Me to a Core Wound',
    description:
      'Why did a loved-up couple make me cringe? How I treat triggers like coins in a game, collect the clues, and face the childhood wound underneath.',
    date: '2026-06-05',
    category: 'Healing',
    tags: ['triggers', 'core wounds', 'inner child', 'trust', 'single life', 'relationships'],
    image: { src: '/images/road/road-5.jpg', alt: 'Feet up on a hillside, looking out over the sea at sunset', pos: '50% 40%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re ready to stop running from your triggers and start listening to them, these are the tools I come back to.',
    text: `
That’s the reframe I’d been sitting with for years. And honestly it helped. Seeing affectionate couples as a preview rather than a reminder of what I didn’t have yet. But if I’m being completely honest, part of me didn’t fully believe it. There was still this subtle cringe underneath it all.

And then one day it all finally made sense.

I was sitting in a café and the couple in front of me were doing everything as one person. Feeding each other, serving each other drinks, holding hands, rubbing hands, staring into each other’s eyes. My first thought was aw, that’s really sweet. But right underneath that was something else entirely.

I noticed my thoughts “ That is so unhealthy. I can’t imagine being that intertwined with someone. Ew.”

And I had to stop myself. Because why? Why was I judging two people who were clearly very much in love? Why did genuine intimacy make me want to look away?

So I started journaling. And I went deep.

I like to think of triggers as clues. Like a game. The universe drops coins along the way, they look like triggers. Every cringe, every comparison, every weird feeling you can’t quite name. In a game you wouldn’t run from coins. You’d collect every single one automatically. But in real life most of us do the opposite, we see the trigger and we run the other way. Here’s the thing though. Those coins are currency. Collect enough of them, understand what they mean, and they buy you the tools to get through the level. Face the big boss, the core wound underneath it all, defeat it, and you unlock the next stage.

That’s exactly what happened to me. In the space of one week the universe dropped three coins. Three separate triggers I almost ran from. Until I stopped, picked them up, and put the pieces together.

## Coin one

The couple in the café. The one I just described. The ew, cringe, that is so unhealthy reaction to two people who were clearly just very much in love.

So this time instead of looking away, I picked up the coin.

## Coin two

The day before, I’d noticed a hot guy at a café with a woman. And instantly, before I even knew what was happening, I was comparing myself to her. She’s not even that great. And the moment I caught that thought I was horrified. Because that is not me. I don’t think that way about other women. So why did I just do that?

I sat with it. And I watched the whole sequence play out:

I saw the hot guy. I compared myself to her. I started picking out her flaws. I came up with reasons why he settled for her. I noticed him glance in my direction and immediately decided he was disloyal, that was the only explanation that made sense to me. And then when they left I avoided all eye contact with him because I didn’t want to feed his ego and I didn’t want her to feel uncomfortable. I was protecting her somehow. A woman I didn’t even know.

And underneath all of it, buried so quietly I almost missed it, it wasn’t actually anything to do with them really; it was more about ‘Why her and not me.’

## Coin three

The high threat man. The attractive man in a relationship who I wouldn’t make eye contact with. Already labelled as disloyal before he’d said a single word to me.

Three completely different situations. Three completely different people. But the same core wound running through all of them.

I picked up all three coins. And then I did what you have to do in the game, I went looking for the big boss.

I went back to childhood to find it.

There was a woman I was very close to growing up. Someone I loved deeply. And the man in her life repeatedly betrayed her. Over and over again. And I could not understand it, because she was so beautiful. So clearly enough. And yet it kept happening.

That experience planted beliefs in me that I’ve been carrying ever since:

Men are untrustworthy. Being beautiful and being enough does not guarantee loyalty. Attraction doesn’t make sense. And someone needs to protect the women.

So I became the protector. The scanner. The one who was always watching for signs of betrayal, always hyperaware of relationship dynamics, always trying to ease her anxiety and make her feel better. I was the rescuer.

And as an adult that looked like: hyperawareness of how men moved through the world. Immediately scanning for disloyalty. Protecting women I didn’t even know. And on a deeper level, choosing men who weren’t quite right because somewhere inside I knew they couldn’t really hurt me. Or ending up with men who were disloyal, because that was the story I already knew.

There’s actually neuroscience behind this. When we experience or witness relational trauma as children, the brain encodes it as a survival blueprint. The amygdala, the brain’s threat detection system, learns to scan for the same danger signals that caused pain before. So my nervous system wasn’t being irrational. It was doing exactly what it was wired to do. Protecting me. Protecting her. The same way it always had.

And just like Tony Robbins talks about, when you notice a car you love you suddenly see it everywhere, my brain had been doing the same thing with disloyal men. Seeing them everywhere. Attracting the stories in. Friends telling me about being cheated on, being treated badly. Women all around me carrying the same wound. I couldn’t even count the amount of stories I’d collected over the years. It wasn’t just my experience anymore. I had become a collector of the collective female wound around men and loyalty. My reticular activating system was filtering my entire reality to find proof of the belief. Not because it was true. But because confirming it felt safer than being blindsided by it.

But here’s the thing about protective patterns. They were built for a version of your life that no longer exists.

I faced the big boss. And here’s what I found.

I’m not that little girl anymore. I don’t need to scan every room for betrayal. I don’t need to protect every woman from a pain that already happened. I don’t need to label every attractive man as a threat before he’s even looked at me.

The choices of the men in her life were never about me. They were never about her being enough. They were never proof that love is unsafe.

They were just wounds. And wounds can heal.

So that’s what I’m doing. Going back to the little girl who took all of this on and telling her, you did so well. You protected everyone you could. But it’s not your job anymore. You’re allowed to put it down now.

You’re allowed to trust. Slowly. Carefully. On your own terms.

You’re allowed to let a man look at you without immediately deciding what it means.

You’re allowed to watch a couple feed each other in a café and just think, that’s really beautiful. I want that one day.

Because you do. And it’s coming.

The triggers aren’t there to hurt you. They’re coins. Little clues the universe drops along the way pointing back to the parts of you that are still waiting to be seen, held and healed.

Don’t run from them.

Collect them, put the pieces together and unlock the next level.

🤍
`,
  },
  {
    slug: 'empath-protecting-your-energy',
    title: 'I Was the Friend Everyone Leaned On, and I Walked Away Zapped',
    subtitle:
      'They\'d always say "OMG I feel so much better after seeing you." And I\'d walk away feeling absolutely zapped of all my energy, needing days to recover. What I\'ve learnt after years of absorbing everyone else\'s pain - from years of isolation to finally feeling safe enough to let people back in.',
    seoTitle: 'Empath Burnout: How I Protect My Energy Without Pushing People Away',
    description:
      'Everyone felt better after seeing me; I needed days to recover. What I’ve learnt as an empath about clairsentience, boundaries and protecting my energy.',
    date: '2026-06-08',
    category: 'Healing',
    tags: ['empath', 'clairsentience', 'energetic boundaries', 'people pleasing', 'protecting your energy'],
    image: { src: '/images/road/road-6.jpg', alt: 'A lone tree by a still lake with hills behind', pos: '50% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If you’re a feeler who keeps running on empty, start by grounding yourself first. These five days of practices are where I’d begin.',
    text: `
For a long time I thought that was just who I was. The supportive one. The one who made everyone feel good. I actually prided myself on it to an extent.

What I didn’t understand back then was why I always felt so wrecked afterwards.

It wasn’t until I started slowing down and doing the inner work that I truly understood what was actually happening. I’d always known I was an empath. I’d always known about my psychic abilities. But I didn’t understand the mechanics of it — why I was absorbing so much, why I couldn’t seem to switch it off, why other people’s energy was hitting me so hard. Why couldn’t I just be normal?

I would get so frustrated. And honestly I’d start blaming the other person for taking my energy. Until I came across an Aaron Doughty podcast where he broke down what was actually going on. As much as we want to blame others for taking our energy — we are also getting something from the dynamic. We are “gaining love.” Because in this dynamic they need us. We are the support, the one who lifts them up. But in that process we are also “taking” — because we are gaining love through being needed. When I finally saw it like that I stopped pointing the finger and started taking responsibility for my own part in it. That self awareness was the beginning of actually healing the pattern.

My strongest psychic ability is clairsentience — and if you’re an empath, there’s a good chance you have it too. It’s the ability to feel other people’s emotions and pain as if they were your own. It’s why we absorb what isn’t ours. It’s why we get energetically wiped out by other people. And it’s why being alone so often feels like the only place we can actually breathe.

I’ll never forget this moment.

One night I woke up in the middle of the night with this heavy, crushing pain in my heart. Heart racing. Anxious AF. I lay there trying to make sense of it because nothing was wrong in my life. I was fine. I had nothing to be anxious or sad about.

The next morning I had a PT client. She walked into her session and I knew instantly something was wrong. And she told me her boyfriend had broken up with her.

I had literally felt her heartbreak before she even told me it happened.

That is just one example. The amount of times similar things happened — I can’t even count anymore.

Back then I just knew I was sensitive to energy. I could feel other people’s pain and emotions like they were my own. It was meant to be a gift but it felt more like a curse. Because I didn’t know what to do with it, I started avoiding anyone and anything that was going through something hard. And I say it like that because I’m a very positive person — I love uplifting energy, I thrive in it. But having low emotions is also just a part of life. And I couldn’t even be a part of that for the people I loved without taking it all home with me. The alternative was spending a few hours with someone and then being wiped out for a week. Getting rashes. Migraines. Bed-ridden from anxiety and depressive thoughts that weren’t even mine.

And when I did spend time with people who drained me I’d end up running to my healer because I didn’t feel strong enough or believe I could clear it myself.

So I chose peace. I chose being on my own.

And over the years, that became my norm. My circle got smaller and smaller. Friends I’d had for years, people I genuinely loved — I slowly stopped making plans, stopped reaching out, let things fade. Or ended them completely.

It’s been over 5 years since I’ve been in an actual proper romantic relationship. Years since I’ve had a really close group of friends.

Which on reflection is so sad. Because I didn’t cut those people out because I didn’t love them or want them in my life. I cut them out because I didn’t know what else to do.

I want to be clear though — a lot of those friendships genuinely weren’t healthy. A lot of them I was people pleasing, accepting less than I deserved, not being treated well. So it’s a very fine line between pushing people away out of self-protection versus walking away because you actually respect yourself.

I’m still figuring out where that line is honestly.

But here’s what I know now that I didn’t know then.

Since slowing down and breaking free from hustle culture conditioning, my inner voice and discernment has become very loud. And so have my psychic abilities. So when it comes to new people and new friendships, I’m very aware of dynamics that don’t feel right. I can feel it quickly. And rather than entertaining something that doesn’t feel good, I trust that now.

The challenging part before was that I’d always second-guess myself. Was I actually picking up on something that wasn’t mine, or was it my own pain getting triggered? That self-doubt kept me stuck. Having the tools to protect myself energetically but not trusting them. Not trusting myself.

And here’s the thing — when your energy is leaking, when you’re not fully present in yourself, that’s when you open yourself up. Other people’s pain, anxiety, grief, heaviness — it finds the gaps and comes straight in. Protecting your energy isn’t just about what you do after. It starts before you even walk into the room.

That’s the part nobody talks about. Having the gifts but not trusting them. Sensing something clearly and then talking yourself out of it. The more I did the inner work, the more I started using the protection tools and listening to my intuition, the more I started to build trust in my own healing and protection abilities. That was the shift.

It’s only now that I truly believe in my own power and ability to protect myself.

And that’s what changed everything.

## The techniques I’ve come to trust

Strong behavioural boundaries. Being authentically yourself in every space you enter. No shrinking. No performing. No people pleasing. When you show up as genuinely you, you’re energetically healthy. Because when your energy is leaking trying to be something you’re not, that’s when other people’s stuff gets in.

Strong energetic boundaries. Before entering any space or seeing anyone — protect yourself first. I visualise a white bubble around me. I call on Archangel Michael and my spirit guides for protection. It takes two minutes. And the more you do it the more you’ll start to believe it — because the very first time I did it, I didn’t believe or trust it either.

Cleansing and clearing. Daily tapping. Washing my hands with salt when I get home — or even during an interaction, slipping away to the bathroom to do it. Selenite and black tourmaline I always have on me — I keep them in my bra. And if I want extra clearing I burn palo santo. Sage is a bit too strong for me. You just need to find what works for you.

And this one I come back to constantly — I check in with myself. If I start to feel emotions that are strong and I sense they might not be mine, I put my hand on my heart and ask: is this theirs? If my heart expands, it’s theirs, not mine. And then I know I need to clear it. A lot of the time it’s anxiety, a heavy foggy brain, or even a physical sensation that mirrors something they’re going through. As soon as I feel it I say “return to sender” — and it’s off me and back where it belongs.

For a long time I thought it was just me. That something was wrong with me, I was too sensitive, too much. I went to healers looking for answers and left feeling judged instead of supported. No one told me this was something I could actually learn to navigate. That I could be an empath and still have deep, meaningful connections. That I didn’t have to choose between people and my peace.

But there is another way. You don’t have to disappear to feel safe. You just have to learn how to come home to yourself first and your self trust will build from there.
`,
  },
  {
    slug: 'overcoming-fear-of-riding-a-scooter-week-2',
    title: 'I’m 38 and Overcoming My Fear of Riding a Scooter',
    subtitle:
      'Little did I know it was going to trigger all kinds of childhood wounds.',
    seoTitle: 'Overcoming My Fear of Riding a Scooter at 38 (Week 2 in Vietnam)',
    description:
      'Week 2 of learning to ride a scooter in Vietnam at 38: consistency, feeling the fear, speaking up, and the old wounds being a beginner brought up.',
    date: '2026-08-05',
    category: 'Wild',
    tags: ['fear of riding a scooter', 'learning a new skill', 'Vietnam', 'perfectionism', 'nervous system', 'courage'],
    image: { src: '/images/road/road-4.jpg', alt: 'A white scooter parked under palm trees on a quiet path', pos: '50% 60%' },
    offer: 'The 5 Day Reconnect',
    offerLine: 'If something new has your nervous system on high alert, these are the tools I use to ground myself and keep showing up anyway.',
    text: `
Week 2 🛵

After a week riding on my own, some days I felt good, confident, proud of myself. Other days I felt anxious, like I was going backwards, like I wanted to give up.

Being an ex personal trainer, I keep noticing how similar this whole learning experience is to coaching a beginner client at the gym. And honestly I think it applies to learning any new skill.

But the deeper I get into this, the more I’m realising it’s not really about the scooter at all. It’s turned into this whole healing experience. Every fear, every wobble, every hard day is bringing up old triggers and wounds I didn’t even know were still sitting there. And moving through it, instead of avoiding it, is actually helping me heal them.

## 1. Consistency

Out of the 7 days, I rode 5 of them. If my beginner client, who was scared of the gym, showed up 5 days out of 7, I’d be so fucking proud of them. Right? So why wasn’t I giving myself that same cheerleader energy? Instead of focusing on the 5 days I did show up, I was zooming in on the 2 I didn’t. We really are our own toughest critics.

## 2. Feeling the fear and doing it anyway

Most days when I hopped on the bike I felt anxious. Part of me wanted to say ‘let’s just get a Grab today’ or skip practice altogether. But I kept checking in with my intuition, am I anxious because something in me is actually saying don’t do this today, or am I anxious because I’m just scared? Almost every time, it was the second one.

What’s interesting is my biggest fear about riding isn’t even having an accident. This experience actually helped me uncover what was really going on beneath it. I’m such a perfectionist, and being a beginner at something, not knowing what I’m doing, looking stupid, was activating an old wound. Not being smart enough. Not being capable. Isn’t that wild, my nervous system wasn’t reacting to the actual danger of falling off a bike, it was reacting to that wound getting poked. I’m more scared of how I’ll be perceived than of actually getting hurt. My inner child linked not being good at something with not being safe, with being rejected, with not receiving love. Unworthy.

I’ve been doing a lot of nervous system regulation work over the past 6 months, and honestly before I started learning to ride, my nervous system was the most regulated it’s ever been. These past few weeks it’s been so activated. Being aware of my body through this whole experience has been interesting, realising I’m completely safe, nothing is actually endangering me, yet my fight or flight is fully switched on just from sitting on the bike. I constantly have to check in with my body, ground myself back down. Focus on my breath. Relax my jaw. Drop my shoulders. My instructor’s words on loop in my head the whole time, ‘just relax.’

## 3. Small steps to build confidence

Rather than throwing myself in the deep end, I’ve taken it in stages. If you’re brand new at the gym, you don’t walk in and throw 100kg on a barbell squat. You strip it back, work on bodyweight, and build up once you’ve nailed the foundations. Same thing here, lessons first (throttle control, feet up, turning, maneuvers, different terrain), then my first ride alone, then further distances, busier roads, parking, new locations. One step, then the next. And actually pausing to acknowledge the progress instead of rushing past it.

## 4. Proving to myself I’m capable, even when my mind says otherwise

Even on the days my brain is fully convinced I can’t do this, I get on anyway. Every time I do, it’s proof I’m collecting, not for anyone watching, just for me.

## 5. Letting myself get knocked down without letting it mean something

Same as the gym, one bad interaction with another member, or a coach, and suddenly someone doesn’t want to come back.

I’d started feeling really confident on the busier roads, riding into traffic in Vietnam, so I figured I’d level up and book a lesson with a new instructor to ride around the city with him. Within the first minute of the lesson I watched someone else have an accident, blood pouring from his head. I literally rode over his blood that was all over the road. And I just didn’t feel safe with this instructor. There were signs. My intuition was telling me something was off before I even got on the bike.

Looking back, this whole thing was actually a bigger assignment than just the riding. It was about communicating my needs and actually being heard. I told him multiple times what I needed, what was making me uncomfortable, and he wasn’t listening. He kept overstepping my boundaries anyway. Which, if I’m honest, is its own childhood wound, not being heard, having to just push through and go along with it because that’s what keeps the peace.

Old me would’ve people-pleased through the whole lesson, smiled, said I was fine, and gone home shaking. This time I spoke up and ended the lesson. Unapologetically. No over-explaining, no cushioning it for his feelings.

I went from confident and capable to completely undone after that session anyway. I didn’t want to ride anymore. I stopped for 3 days.

But even after all that, even after 3 days where I could’ve just thrown in the towel for good, I got back on the bike. Nervous, scared, and I did it anyway. And I felt good after.

## 6. Self compassion

It’s ok to not be good at something yet. Doing something scary, and having the courage to even put yourself in that position, is already big. That’s something a lot of people never even try.

So if you’re learning something new and it’s hard right now, hear this. It’s ok not to be good yet. It’s ok to be a beginner. Everyone who’s good at what you’re learning had to start exactly where you are.

This has taught me so much about trust, presence, staying in my body instead of spiralling in my head. It can feel lonely. It can feel like you’ll never get the hang of it.

If you’re in your own version of week 2 right now, new job, new relationship, new city, whatever it is, and you’re shaky and unsure and kind of hate being bad at it, same. I’m right there with you. Underneath all of it I think it’s really just fear of the unknown. Not knowing how it’s going to go, not knowing if you can actually do it, sitting in that uncertainty when every part of you wants certainty before you’ll even try. Nobody talks about this part, the part where you’re not good yet and you just have to keep showing up anyway and feel like an idiot for a while. But you’re allowed to be scared and do it anyway. That’s actually the whole thing.

I’m still on week 2. Still nervous most days. But I keep choosing to show up for myself anyway, wobbles, anxiety and all. And I keep reminding myself I'm doing the best that I can. 🛵🤍
`,
  },
  {
    slug: 'be-a-little-delulu-the-universe-has-your-back',
    title: 'I Believe You’ve Got to Be a Little Delulu to Get What You Want in Life',
    subtitle:
      'Week 3 of overcoming my fear of riding a scooter, and the universe keeps sending proof it\'s got my back',
    seoTitle: 'Be a Little Delulu: Proof the Universe Has Your Back (Scooter Week 3)',
    description:
      'Week 3 of conquering my fear of riding a scooter in Vietnam, and the little gifts (a puppy, a water buffalo, the right bike) that proved the universe has my back.',
    date: '2026-08-12',
    category: 'Wild',
    tags: ['faith', 'the universe has your back', 'fear of riding a scooter', 'Da Nang', 'Hoi An', 'Vietnam'],
    image: { src: '/images/road/road-7.jpg', alt: 'A water buffalo grazing in a green field', pos: '50% 50%' },
    offer: 'The Freedom Frequency',
    offerLine: 'If you’re standing on the edge of the thing that scares you, this is everything I learned about leaping into the unknown and landing on my feet.',
    text: `
🎧 Love Lost – Mac Miller, The Temper Trap

I always believe the universe has my back. No matter what.

Whenever I do something that scares me, like when I threw my life up in the air at 2 years ago, the thing that got me through it was my undeniable trust that the universe supported me no matter what. I genuinely believed that for me to take such an act of courage, the universe would have no other option but to reward me.

In my delulu brain, when I do the shit that scares me, I know 110%. Even if I’m scared, if I put myself out there and leap, I will be okay. I’ll throw myself in the deep end of the unknown and I’ll always land on my feet, because the universe has got me.

I trust it and believe it 110%. Which yeah, sure, on some level makes me delulu. But I believe you have to be a bit delulu to get what you want.

To have that complete faith is one thing. How I got there is what I’ve been reflecting on today. I actually realised recently that I’ve unknowingly been collecting little pieces of proof that this belief is, in fact, true. And I guess that’s how any belief works, right, when you believe something, your mind literally creates things in your reality to support it. Whether it’s a positive belief or a negative one. I’ve spoken to locals here in Vietnam and they’ve told me they’ve never seen a scooter accident. But because I’ve been so fearful of riding, I saw three scooter accidents in the span of 48 hours. Isn’t that wild.

Anyway, back to the positive belief. That the universe has my back no matter what. The little pieces of proof my brain has been collecting.

It’s the start of week 3 of overcoming my fear of riding a scooter, and I’ve been thinking about the times I was most scared riding. Every single time, the universe dropped a little piece of magic at the exact moment I needed it. And by magic I mean the universe gifted me with something to bring me back into the present moment. Because of my fear around riding, I go straight into fight or flight the second I get on the bike. Some days it’s minimal. Other days, hormonal, energy off, weather, confidence knocked, my anxiety is heightened. And it’s on those days that the universe has shown up.

Gift from the universe #1. I went to my lesson feeling really fight or flighty, hadn’t slept well, and got there to find the person before me had just had an accident on the bike I was about to use. There was chaos everywhere in the carpark I was practicing in: kids running around flying kites, cars with learners practicing driving, hazards and noise left, right and centre. I was off my game and it wasn’t getting better, half an hour in, overthinking everything, confidence at an all time low. Then I saw a little puppy. The cutest little Bali doggo. And I knew he was sent to me to ground me back down to earth. He hung around while I practiced, and just being with him was the constant reminder that none of what was going on in my body and mind actually mattered. He kept bringing me home to myself. Reminding me the fear isn’t even real.

Gift from the universe #2. The very first time I rode solo, I was planning to ride to a cafe but decided to follow my intuition instead, and it guided me toward the rice fields. I went down this little road and got scared when a huge truck came barrelling toward me. I had to tip over to the side, hanging off the edge of the pavement to let it pass. Right after that, my gift: a huge, friendly water buffalo. I stayed with him for half an hour, completely brought back into the present moment, reminded why I was learning to ride in the first place. For the freedom. For being able to stop wherever I want and let magic like this happen.

Gift from the universe #3. I’d just moved into the city in Da Nang, only on day three of riding solo. Busy roads, new area, new road rules, all of it. I was so anxious I didn’t even want to go to the bike shop to hire the bike, the whole errand was an anxiety attack in itself. I’d contacted the owner beforehand about two bikes I was interested in, and he said only one was available, the one I’d already been practicing on in Hoi An, which felt like a small mercy. But when I got there and test-rode it, it felt completely different. The throttle was way more sensitive, my feet barely grazed the ground where before I’d at least been on my tiptoes. I had to stop multiple times just to calm my heart rate. Ten minutes of going up and down this tiny alley, workers watching me like they hoped I wouldn’t hit them, then the owner rides over on the other bike. The one I’d actually wanted. “The person just returned it,” he said. In that exact window of time, on that exact morning, the bike that was easier, lower to the ground, meant to be mine, just appeared. Random? I don’t think so. It was on purpose. It was meant to be. He even drove me home himself so I didn’t have to navigate the busy roads on it straight away.

Gift from the universe #4. Day one of riding solo in Da Nang. Even the thought of getting the bike off its parking spot gave me anxiety, it was on the slightest incline, and honestly, even now in week 3, that still gets me. I know it’s silly, but my mind and body still go there. I rode to a quiet street to practice, going up and down, building confidence, and a little boy came out to watch. We chatted a bit over Google Translate, I told him I was learning to ride, and he went and got his own bicycle so he could ride up and down the road with me. From that day on, every time I came back to practice, he was there. Another small magic, grounding me out of the fear.

The last one I’ll mention: the other day, feeling off, period due, hadn’t ridden in a few days, not exactly my most confident self. I rode down that same quiet street and found the cutest kids sitting on parked scooters, lying on them, completely fearless. I ended up having the most beautiful moment playing with them, chatting, climbing all over my bike, genuinely a little scared it might topple and hurt them, but they were so carefree it didn’t matter. The fear of riding just disappeared.

I’ve thought of so many other gifts since writing this, but I’ll leave it there or I’ll be writing all night.

It always comes back to faith, and to what we believe. The belief that has gotten me through it all, the scary times, the dark moments, the fears, is that the universe has my back no matter what. And the micro magic moments that have happened over my life, and in just these past few weeks of overcoming my fear of riding, are proof for myself that the belief is real.

So if you’re contemplating whether or not to do the thing that scares you, remember the universe has got you. It doesn’t matter how scary it is. It’s about jumping into the unknown without knowing what’s going to happen. That’s when you get backed 110%. The thing you’ve been putting off. Commit and do it. Because what have you got to lose, really? The universe has supported you always, through the dark, through the tough times. You’ve made it through every hard thing so far, so what’s different now?

If you’re still doubting, collect the data. Write down all the times the universe has supported you, and start making that belief 110% real from the proof in your own life. You’ve got this! ✨
`,
  },
];

export const journalPage = {
  label: 'Journal',
  heading: 'Entries From My Journal',
  intro: 'Honest stories from starting over: the leaps, the fear, the healing and the everyday moments in between.',
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

export const findArticle = (slug: string) => journal.find((a) => a.slug === slug);

// Newest first.
export const sortedJournal = () => [...journal].sort((a, b) => b.date.localeCompare(a.date));
