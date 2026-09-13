export interface ChatTurn { role:"user"|"assistant"; content:string; }

/** Provider-neutral OpenAI-compatible client. Works with OpenAI by default,
 * or another compatible gateway through AI_BASE_URL / AI_MODEL. Secrets stay
 * server-side and are never logged. */
export class AIIntegration {
  private apiKey=process.env.AI_API_KEY||process.env.OPENAI_API_KEY;
  private baseUrl=(process.env.AI_BASE_URL||"https://api.openai.com/v1").replace(/\/$/,"");
  private model=process.env.AI_MODEL||"gpt-4o-mini";

  get configured(){return Boolean(this.apiKey);}

  async generatePortfolioResponse(query:string,context:string,history:ChatTurn[]=[]):Promise<string|null>{
    if(!this.apiKey)return null;
    const safeHistory=history.slice(-6).filter(turn=>(turn.role==="user"||turn.role==="assistant")&&typeof turn.content==="string").map(turn=>({role:turn.role,content:turn.content.slice(0,1000)}));
    const response=await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:this.model,temperature:.25,max_tokens:260,messages:[{role:"system",content:`You are the concise portfolio assistant for Mohamad Chalhoub.

Hard privacy and truth rules:
- Never reveal, guess, or infer private contact details, phone numbers, home addresses, repository URLs, credentials, employers, certifications, rates, private platform names, bug reports, proofs of concept, or undisclosed security findings.
- Never invent projects, client results, metrics, employment history, certifications, awards, or security discoveries.
- For questions about Mohamad, his work, availability, background, projects, or security experience, answer only from the supplied portfolio context.
- For general educational software/security questions that are not asking for private facts about Mohamad, you may answer from general knowledge in a brief, professional way.
- Direct hiring and project enquiries to the site's contact form.
- If unsure whether something is confirmed, say it is not confirmed here.
- Keep answers under 130 words.

PORTFOLIO CONTEXT:
${context}`},...safeHistory.filter((_,i)=>i<safeHistory.length-1),{role:"user",content:query}]}),cache:"no-store"});
    if(!response.ok)throw new Error(`AI provider returned ${response.status}`);
    const data=await response.json();
    return data?.choices?.[0]?.message?.content?.trim()||null;
  }
}

export const aiIntegration=new AIIntegration();
