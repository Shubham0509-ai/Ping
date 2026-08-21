import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    // Pass the standard Node/Express request object to Arcjet
    const decision = await aj.protect(req);

    console.log(`Arcjet decision conclusion: ${decision.conclusion}`);

    // If Arcjet blocks the request, intercept the pipeline
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return res.status(403).json({ 
          error: "Forbidden", 
          message: "Automated client access is not permitted." 
        });
      }

      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ 
          error: "Too Many Requests", 
          message: "Rate limit exceeded. Please try again later." 
        });
      }

      // Fallback for general denials (e.g., WAF/Shield if configured)
      return res.status(403).json({ error: "Access Denied" });
    }

    // check for spoofed bots - these are bots that act like humans
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    // Arcjet approved - move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);
    // Fail-open strategy: pass through if the Arcjet service experiences an issue
    next();
  }
};