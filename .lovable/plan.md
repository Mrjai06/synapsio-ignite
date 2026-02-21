

## Business Model: Conceptual Redesign

Replace all explicit prices and thresholds with a concept-driven presentation that communicates the pricing *structure* without committing to specific numbers.

### Changes

**File: `src/components/premium/OpportunitySection.tsx`**

1. **Subscription Tiers** - Remove all prices (10€, 50€, 250€, Custom) and transaction limits (1,000€, 5,000€, etc.). Instead, describe each tier qualitatively:
   - **Getting Started** - "For small businesses starting out"
   - **Base** - "For growing businesses with moderate volume"
   - **Advanced** - "For established businesses with high volume"
   - **Enterprise** - "Tailored solutions for large-scale operations"

2. **Tiered Transaction Fees** - Replace the specific percentage table with a conceptual description: a visual showing that fees decrease as transaction volume increases (e.g., a simple gradient or stepped diagram with labels like "Low Volume → Higher Fee" down to "High Volume → Lower Fee"), without any specific percentages.

3. **Overage Policy** - Replace the "15€ per 1,000€" detail with a general statement like: "If your monthly limit is reached, you'll be notified. Continuing beyond the limit incurs a small additional fee."

4. **Remove the disclaimer** about fictional pricing since no specific numbers will be shown.

5. **Add a note** such as: "Final pricing will be determined closer to launch. Contact us to learn more."

### Technical Details

- Update the `subscriptionTiers` array: remove `price` field, add a `description` field for qualitative text
- Replace the `tieredPricing` array with a simple conceptual visual (e.g., 4-5 volume bands labeled "Low" to "Very High" with a visual indicator that fees decrease)
- Update the rendering logic to show descriptions instead of price badges
- Keep the gastro discount concept as a note: "Reduced fees available for select industries (e.g., gastronomy)"
- Maintain current styling patterns (GlassPanel, FloatingSurface, etc.)

