
"use client"

import React, { useState, useEffect } from 'react';
import { Camera, Upload, Edit3, Settings, Database, Activity, Package, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAlloyStore } from '@/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export default function OperatorDashboard() {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isConfigured, setIsConfigured] = useState(true);
  const router = useRouter();
  const { wipCoils, wipCtls } = useAlloyStore();

  useEffect(() => {
    // Check if Firebase is configured via env vars
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey || apiKey === "PLACEHOLDER" || !apiKey) {
      setIsConfigured(false);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '9632') {
      setIsAdminLoginOpen(false);
      router.push('/admin/dashboard');
    } else {
      toast({ title: "Access Denied", description: "Incorrect PIN.", variant: "destructive" });
      setAdminPin('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <button 
        onClick={() => setIsAdminLoginOpen(true)} 
        className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors z-50"
      >
        <Settings className="w-5 h-5" />
      </button>

      <header className="pt-6 pb-4 px-6 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent animate-pulse" />
          <h1 className="text-xl font-headline tracking-tighter uppercase font-bold text-primary">
            Alloy<span className="text-accent">Stream</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-[0.3em]">Precision Core v2.5</p>
      </header>

      {!isConfigured && (
        <div className="mx-4 mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-pulse">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-destructive uppercase">Database Disconnected</p>
            <p className="text-[9px] text-muted-foreground">Add Firebase Keys to Vercel Environment Variables to enable persistence.</p>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 pb-8 max-w-2xl mx-auto w-full grid grid-cols-2 gap-3 auto-rows-max">
        <Link 
          href="/operator/scan" 
          className="operator-button group col-span-2 py-6 bg-primary/10 border-primary/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <Camera className="w-8 h-8 text-accent mb-1 group-hover:scale-110 transition-transform" />
          <span className="operator-button-label font-bold text-base">Smart Scan Tag</span>
          <span className="text-muted-foreground text-[9px] uppercase font-medium">AI Vision Tracking</span>
        </Link>

        <Link href="/operator/log-coil-manual" className="operator-button p-4">
          <Edit3 className="w-6 h-6 text-accent mb-1" />
          <span className="operator-button-label text-xs">Manual Log</span>
        </Link>

        <Link href="/operator/upload" className="operator-button p-4">
          <Upload className="w-6 h-6 text-accent mb-1" />
          <span className="operator-button-label text-xs">Upload Tag</span>
        </Link>

        <Link href="/operator/wip-coils" className="operator-button p-4 group relative">
          <div className="absolute top-2 right-2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
            {wipCoils.filter(c => c.status === 'active').length}
          </div>
          <Database className="w-6 h-6 text-accent mb-1" />
          <span className="operator-button-label text-xs">Coil WIP</span>
        </Link>

        <Link href="/operator/wip-ctls" className="operator-button p-4 group relative">
          <div className="absolute top-2 right-2 bg-accent text-black text-[8px] px-1.5 py-0.5 rounded-full font-bold">
            {wipCtls.reduce((acc, curr) => acc + curr.count, 0)}
          </div>
          <Package className="w-6 h-6 text-accent mb-1" />
          <span className="operator-button-label text-xs">CTL WIP</span>
        </Link>
      </main>

      <footer className="p-3 bg-secondary/30 border-t border-border flex flex-col gap-1 text-[8px] uppercase tracking-widest text-muted-foreground font-bold">
        <div className="flex justify-between items-center w-full">
          <span>v2.5.2-Update-{new Date().toLocaleDateString()}</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-accent animate-pulse' : 'bg-destructive'}`} />
            <span>{isConfigured ? 'Production Live' : 'Demo Mode (Not Saving)'}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 justify-center opacity-50">
          <RefreshCw className="w-2 h-2" />
          <span>Sync Zip to GitHub after every AI change</span>
        </div>
      </footer>

      <Dialog open={isAdminLoginOpen} onOpenChange={setIsAdminLoginOpen}>
        <DialogContent className="max-w-xs bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-center">Admin Access</DialogTitle>
            <DialogDescription className="text-center">Enter PIN for Master Audit Controls</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdminLogin} className="space-y-4 py-4">
            <Input 
              type="password" 
              placeholder="••••" 
              className="text-center text-2xl tracking-[0.5em] h-14 bg-secondary border-primary/30" 
              maxLength={4} 
              value={adminPin} 
              onChange={(e) => setAdminPin(e.target.value)} 
              autoFocus 
            />
            <Button type="submit" className="w-full h-12">Authorize</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
