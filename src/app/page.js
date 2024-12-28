"use client";

import React, { useState, useEffect } from "react";
import {
  Rocket,
  Flame,
  Diamond,
  ArrowRight,
  Coins,
  Globe,
  Copy,
  Check,
  Lock,
} from "lucide-react";
import { FaXTwitter, FaTelegram, FaDiscord } from "react-icons/fa6";

import Image from "next/image";

const GoldenApeLanding = () => {
  const [tokenData, setTokenData] = useState({
    price: "Loading",
    priceChange: 0,
    marketCap: "Loading",
    volume: "Loading",
    liquidity: "Loading",
    contractAddress: "Loading",
    dexUrl: "",
    socials: {},
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.dexscreener.com/latest/dex/tokens/HREdVBmGvUvdgvoGeHwYpEQNJRb1oqmScwV5z1dHpump"
    )
      .then((x) => x.json())
      .then((x) => {
        const pair = x.pairs.find((x) => x.dexId === "raydium");
        if (pair) {
          setTokenData({
            price: `$${pair.priceUsd}`,
            priceChange: pair.priceChange.h24,
            marketCap: `$${parseInt(pair.marketCap).toLocaleString()}`,
            volume: `$${parseInt(pair.volume.h24).toLocaleString()}`,
            liquidity: `$${parseInt(pair.liquidity.usd).toLocaleString()}`,
            contractAddress: pair.baseToken.address,
            dexUrl: pair.url,
            socials: {
              discord: "https://discord.gg/wkbeast",
              ...Object.fromEntries(
                pair.info.socials.map((social) => [social.type, social.url])
              ),
            },
          });
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tokenData.contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <header className="relative" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 bg-[url('/logo.jpeg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-screen">
          <div className="animate-bounce mb-8">
            <Image
              src={"/logo.jpeg"}
              width={100}
              height={100}
              className="rounded-full"
              alt="Golden Ape Logo"
            />
          </div>
          <h1 className="text-8xl font-bold mb-6 text-yellow-400">$GAPE</h1>
          <p className="text-4xl text-white text-center mb-8">
            The Golden Ape Revolution 🦍👑
          </p>

          {/* Contract Address */}
          <div className="bg-black bg-opacity-50 p-1 py-2 sm:p-4 rounded-lg border border-yellow-400 mb-12 w-full max-w-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="text-white font-mono text-xs sm:text-sm break-all">
                {tokenData.contractAddress}
              </div>
              <button
                onClick={handleCopy}
                className="text-yellow-400 hover:text-yellow-300 transition-colors shrink-0"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={tokenData.dexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black font-bold py-6 px-12 rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105 text-xl inline-flex items-center"
            >
              Buy Now 🚀
            </a>
            <a
              href={tokenData.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-yellow-400 text-yellow-400 font-bold py-6 px-12 rounded-xl hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 text-xl inline-flex items-center"
            >
              Join Community 🦍
            </a>
          </div>
        </div>
      </header>

      {/* Token Stats */}
      <section className="py-24 bg-yellow-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Coins className="w-12 h-12" />}
              value={`${tokenData.marketCap}`}
              label="Market Cap"
              trend="💎"
            />
            <StatCard
              icon={<Diamond className="w-12 h-12" />}
              value={`${tokenData.price}`}
              label="Price"
              trend={tokenData.priceChange}
            />
            <StatCard
              icon={<Lock className="w-12 h-12" />}
              value={tokenData.liquidity}
              label="Liquidity"
              trend="💰"
            />
            <StatCard
              icon={<Globe className="w-12 h-12" />}
              value={tokenData.volume}
              label="24H Volume"
              trend="📈"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-400">
            Why Choose $GAPE? 🦍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Rocket className="w-20 h-20" />}
              title="Moon Mission Ready 🚀"
              description="Hyper-deflationary tokenomics designed for explosive growth"
            />
            <FeatureCard
              icon={<Flame className="w-20 h-20" />}
              title="Burn System 🔥"
              description="More than 10% of total supply will be burned forever"
            />
            <FeatureCard
              icon={<Diamond className="w-20 h-20" />}
              title="Diamond Hand Rewards 💎"
              description="Backed by the biggest diamond hand community"
            />
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="py-24 bg-yellow-400">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">
            Tokenomics 📊
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-black p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-8 text-yellow-400">
                Supply Distribution
              </h3>
              <ul className="space-y-6">
                <li className="flex justify-between text-white text-xl">
                  <span>Total Supply:</span>
                  <span>1,000,000,000,000</span>
                </li>
                <li className="flex justify-between text-white text-xl">
                  <span>Burned:</span>
                  <span>65,600,000,000</span>
                </li>
                <li className="flex justify-between text-white text-xl">
                  <span>Circulating:</span>
                  <span>934,400,000,000</span>
                </li>
              </ul>
            </div>
            <div className="bg-black p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-8 text-yellow-400">
                Anti-Rug System 🛡️
              </h3>
              <ul className="space-y-6">
                <li className="flex justify-between text-white text-xl">
                  <span>Liquidity Lock:</span>
                  <span>Permanent</span>
                </li>
                <li className="flex justify-between text-white text-xl">
                  <span>Holders:</span>
                  <span>8,500</span>
                </li>
                <li className="flex justify-between text-white text-xl">
                  <span>Max Wallet:</span>
                  <span>4%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-400">
            Roadmap to the Moon 🚀
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <RoadmapCard
              phase="Phase 1"
              items={[
                "Launch 🚀",
                "1,000 Holders",
                "CoinGecko Listing",
                "Community Building",
              ]}
            />
            <RoadmapCard
              phase="Phase 2"
              items={[
                "CMC Listing",
                "10,000 Holders",
                "Influencer Marketing",
                "Partnerships",
              ]}
            />
            <RoadmapCard
              phase="Phase 3"
              items={[
                "CEX Listings",
                "50,000 Holders",
                "NFT Collection",
                "Staking Platform",
              ]}
            />
            <RoadmapCard
              phase="Phase 4"
              items={[
                "100,000 Holders",
                "Major CEX Listings",
                "Golden Ape DAO",
                "To The Moon! 🌕",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trading CTA Section */}
      <section className="py-16 md:py-24 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-black">
            Start Trading Now! 📈
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href={"https://phantom.com/tokens/solana/" +tokenData.contractAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-black text-yellow-400 font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 text-lg sm:text-xl flex items-center justify-center"
            >
              Buy on Phantom
              <ArrowRight className="ml-2 w-6 h-6" />
            </a>
            <a
              href={tokenData.dexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-black text-yellow-400 font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 text-lg sm:text-xl flex items-center justify-center"
            >
              Buy on DEX Screener
              <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-yellow-400">
            Join the Golden Ape Army! 🦍
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <SocialButton
              icon={FaXTwitter}
              label="Twitter"
              link={tokenData.socials.twitter}
            />
            <SocialButton
              icon={FaTelegram}
              label="Telegram"
              link={tokenData.socials.telegram}
            />
            <SocialButton
              icon={FaDiscord}
              label="Discord"
              link={tokenData.socials.discord}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-yellow-400 p-12 rounded-2xl text-center transform hover:scale-105 transition-all">
    <div className="flex justify-center mb-6 text-black">{icon}</div>
    <h3 className="text-3xl font-bold mb-4 text-black">{title}</h3>
    <p className="text-black text-xl">{description}</p>
  </div>
);

const StatCard = ({ icon, value, label, trend }) => {
  // Check if trend is a number (either string or number type)
  const isNumericTrend = !isNaN(parseFloat(trend));

  const formatTrend = () => {
    if (!isNumericTrend) return trend;
    const trendValue = parseFloat(trend);
    return `${trendValue >= 0 ? "+" : ""}${trendValue.toFixed(1)}%`;
  };

  const getTrendColor = () => {
    if (!isNumericTrend) return "text-yellow-400";
    const trendValue = parseFloat(trend);
    return trendValue >= 0 ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="bg-black p-8 rounded-2xl text-center">
      <div className="flex justify-center mb-6 text-yellow-400">{icon}</div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400 text-xl mb-2">{label}</div>
      <div className={`font-bold text-xl ${getTrendColor()}`}>
        {formatTrend()}
      </div>
    </div>
  );
};

const RoadmapCard = ({ phase, items }) => (
  <div className="border-2 border-yellow-400 p-8 rounded-2xl">
    <h3 className="text-2xl font-bold mb-6 text-yellow-400">{phase}</h3>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="text-white flex items-center text-lg">
          <span className="mr-2">✅</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const SocialButton = ({ icon, label, link }) => {
  const Icon = icon;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto bg-black text-yellow-400 font-bold py-6 px-12 rounded-xl border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 text-xl flex items-center justify-center"
    >
      <Icon className="mr-2" />
      {label}
    </a>
  );
};

export default GoldenApeLanding;
