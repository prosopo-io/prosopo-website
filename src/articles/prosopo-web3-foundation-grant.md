---
tags: article
title: Prosopo receives grant from Web3 Foundation to help build human verification marketplace for Substrate Parachains
date: 2022-02-07
layout: article.njk
---
We're delighted to announce that Prosopo recently received funding from the [Web3 Foundation](https://web3.foundation/)
to help build our decentralised human verification marketplace.
The [Prosopo protocol](https://github.com/prosopo-io/Grants-Program/blob/947a2c66134f6d6b5b0f9ed147dbf0f66c27f5ad/applications/prosopo.md#w3f-open-grant-proposal)
, designed and built with our partner [Gimly](https://gimly.io), will give Distributed Apps the power to secure their
user traffic and prevent bot attacks, whilst retaining a high level of decentralisation. Services like Prosopo are the
key to moving blockchain applications from the fringes of society to everyday parts of our lives.

## <span class="tickwhite">✭</span> Background

[CAPTCHAs](https://en.wikipedia.org/wiki/CAPTCHA) were developed because of online spam, fraud, and abuse by bad actors attempting to profit from system
weaknesses. In the world of Distributed Apps (DApps), the same patterns of abuse will likely emerge, yet there is no
distributed service available to DApps to verify humanlike behaviour.

Prosopo is designed to help human blockchain users prove their humanness whilst maintaining their privacy. Under the
Prosopo model, Providers supply the market with CAPTCHAs and are rated by their ability to prevent bots and permit humans.
Distributed Apps (DApps) implement CAPTCHAs as part of their contract interaction flow and their users receive
reputation points for completing them. User reputation scores are stored on-chain and accessible to all Polkadot Dapps,
for the benefit of the ecosystem. For a more detailed version, check out the [Grant Application](https://github.com/prosopo-io/Grants-Program/blob/947a2c66134f6d6b5b0f9ed147dbf0f66c27f5ad/applications/prosopo.md#w3f-open-grant-proposal).

## <span class="tickwhite">✭</span> Milestone 1

The initial development began in October 2021 with the Prosopo [Protocol](https://github.com/prosopo-io/protocol/)
smart contract, which will govern the marketplace economics. The contract is written in <code>ink!</code> due to its
type safe and memory safe capabilities that are automatically inherited from Rust. <code>ink!</code> can also be
compiled to WASM, a fast and efficient language created for the web. This increases the interoperability of contracts
written in
<code>ink!</code> as they can be deployed in any WASM Virtual Machine.

We have also created a prototype of the Prosopo [provider](https://github.com/prosopo-io/provider) node, which will form
the network and perform the task of verifying users of Distributed Apps as being human or not. This node is designed to
send solved and unsolved CAPTCHAs to the users of Distributed Apps so that they can verify themselves as being human.
The Providers then update the Protocol smart contract, creating a queryable reputation based on the user's AccountId
which the Distributed Application can use to confirm the user's humanesss via a cross-contract call. This process is
highlighted below.

<div class="article-image">
<div class="image-container">
<img class="img-fluid"
src="https://www.prosopo.io/img/maincaptchaflow.jpg"
alt="alternative">
</div>
</div>

## <span class="tickwhite">✭</span> Lessons So Far

The learning curve to adapt to [<code>ink!</code>](https://paritytech.github.io/ink-docs/) was quite steep coming from
the world of python and other garbage collected languages. However, we quickly realised the Rust compiler is your friend
and following its tips will lead to successful code compilation. <code>ink!</code> is actually a subset of Rust so there
are less things to worry about than if you were coding full Rust projects for the first time.

### no-std

One of the most important things to highlight to <code>ink!</code> newbies is the <code>no-std</code> environment in
Rust. This forces <code>ink!</code> to only load crates that are platform agnostic, meaning that simple tasks, such as
printing variables, cannot necessarily be performed. Instead, contract development in <code>ink!</code>
relies on specific environment functions such as <code>ink_env::debug_println!("{}", "your string here")</code>.
Luckily, the [example](https://github.com/paritytech/ink/blob/master/examples/erc20/lib.rs) contracts demonstrate plenty
of these useful functions.

### Testing

Contract functionality has been tested utilising the <code>ink!</code> unit testing engine and the experimental test
engine. The basic engine supports calling functions but lacks the ability to set a transferred token value or set the
caller, which are both key parts of many of the Prosopo Protocol functions. Working with this combination, we've managed
to cover >90% of the functions in our contract with tests, [tarpaulin](https://github.com/xd009642/tarpaulin) being used
to calculate the coverage metrics.

### Community

The <code>ink!</code> and Polkadot community is very helpful and responsive to questions surrounding development.
Releases come frequent and fast but there are helpful notes that accompany them. You can usually find some guidance or a
solution by chatting to the developers in their [matrix server](https://app.element.io/#/room/#ink:matrix.parity.io).

## <span class="tickwhite">✭</span> What's next?

We now have a basic backend marketplace to which verification Providers and Distributed apps can register but we're some
way off deploying to any of the Polkadot parachains. Our roadmap for Milestone 2 of the Web3 Foundation grant and the
future MVP is highlighted below:

## Milestone 2

<ul>
<li>Create a CAPTCHA frontend that can be embedded in a Distributed Application</li>
<li>Create a demo website showing how users can embed the CAPTCHA challenge</li>
</ul>

### MVP

<ul>
<li>Migrate the contract to <a href="https://github.com/Supercolony-net/openbrush-contracts/tree/main">OpenBrush</a>
</li>
<li>Work out a long term solution for contract upgradeability</li>
<li>Perform load testing of the Provider node</li>
<li>Introduce the economic governance system into the contract</li>
<li>Partner with Polkadot parachains to help prevent bots</li>
<li>+ many more!!!</li>
</ul>

## <span class="tickwhite">✭</span> Who we are

The following people have all been involved in rapidly developing the MVP to help bring Prosopo to life.
{% include "team.njk" %}

Fancy joining the team? We are also now hiring for
a [founding developer](/articles/prosopo-hiring-founding-software-engineer-developer)!

