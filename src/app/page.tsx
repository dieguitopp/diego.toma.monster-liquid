import Image from "next/image";
import DiscordRPC from "@/components/DiscordRPC";
import SocialLink from "@/components/SocialLink";
import CustomCursor from "@/components/CustomCursor";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import FluidBackground from "@/components/FluidBackground";

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      padding: '2rem',
      gap: '2.5rem',
      minHeight: '100vh',
      pointerEvents: 'none'
    }}>
      <CustomCursor />
      <FluidBackground />
      
      {/* Main Title */}
      <h1 className="liquid-title" style={{
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '0',
        padding: '0 1rem',
        zIndex: 10
      }}>
        [diego.toma.monster]
      </h1>

      {/* Discord RPC */}
      <DiscordRPC />

      {/* Social Links */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem', 
        width: '100%', 
        alignItems: 'center' 
      }}>
        <SocialLink 
          href="https://x.com/noirediego" 
          label="Twitter / X" 
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>}
        />
        <SocialLink 
          href="https://steamcommunity.com/id/meephiles/" 
          label="Steam" 
          icon={<Image src="/resources/steam.png" alt="Steam" width={20} height={20} />}
        />
        <SocialLink 
          href="https://www.roblox.com/es/users/263961430/profile" 
          label="Roblox" 
          icon={<Image src="/resources/roblox.png" alt="Roblox" width={20} height={20} />}
        />
      </div>

      <SpotifyPlayer />

      {/* Footer Info */}
      <div style={{ 
        marginTop: 'auto', 
        fontSize: '0.75rem', 
        color: 'var(--secondary)', 
        opacity: 0.5,
        textAlign: 'center'
      }}>
        © {new Date().getFullYear()} • diego.toma.monster
      </div>
    </main>
  );
}
