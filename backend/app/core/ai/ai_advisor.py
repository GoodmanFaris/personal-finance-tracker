from openai import APIError, OpenAI, RateLimitError
import json
import os


api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY is not set")

client = OpenAI(api_key=api_key)

SYSTEM_PROMPT = """
You are a financial advisor.

You analyze a user's financial summary and provide insights.

Provide:
1. Spending Analysis
2. Investment Hint
3. Behavioral Advice
4. Positive Reinforcement

Be concise and supportive.
Do not shame the user.
Do not give risky financial advice.
Do not ask for more data or clarification.
Use only the provided summary data to generate insights.
"""


class AIAdvisorService:

    def generate_insight(self, summary: dict):
        llm_summary = summary.copy()
        llm_summary.pop("user_id", None)
        user_prompt = f"""
User financial summary:

{json.dumps(llm_summary, indent=2)}

Generate financial insights.
"""
        try:
            response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4)
            return response.choices[0].message.content
        except RateLimitError:
            return "AI insights are temporarily unavailable (quota/limit). Please try again later."
        except APIError:
            return "AI insights are temporarily unavailable. Please try again later."
