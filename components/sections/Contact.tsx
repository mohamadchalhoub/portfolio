import { Linkedin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/content/site";
import { SectionShell } from "./SectionShell";

export function Contact() {
  return (
    <SectionShell id="contact">
      <div className="relative overflow-hidden rounded-2xl border border-engineering/15 bg-[radial-gradient(circle_at_12%_0%,rgba(0,212,200,.12),transparent_38%),linear-gradient(135deg,rgba(14,16,48,.96),rgba(9,9,30,.92))] p-6 shadow-[0_30px_100px_rgba(0,0,0,.35),0_0_70px_rgba(0,212,200,.05)] sm:p-9 md:p-12">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(136,153,204,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(136,153,204,.14)_1px,transparent_1px)] [background-size:60px_60px]"/>
      <div className="relative grid gap-12 md:grid-cols-2">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Let&rsquo;s build something<br/><span className="text-engineering">clients trust.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell me what you&rsquo;re building. I&rsquo;ll reply personally to discuss
            scope, timeline and fit.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-emerald-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>Available for selected projects</div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] text-muted-foreground">Private contact</span>
                <span className="text-xs">Use the secure form</span>
              </span>
            </div>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-foreground transition-all hover:border-engineering/25 hover:bg-engineering/[0.04] hover:text-engineering"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] text-muted-foreground">LinkedIn</span><span className="text-xs">Connect</span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={150}>
          <Card className="border-white/[0.09] bg-[#090b24]/90 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Send a message</CardTitle>
              <CardDescription>I typically reply within a couple of days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </Reveal>
      </div>
      </div>
    </SectionShell>
  );
}
