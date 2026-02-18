from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import resend
import os

router = APIRouter(prefix="/contact", tags=["Contact"])

resend.api_key = os.getenv("RESEND_API_KEY")

class ContactRequest(BaseModel):
    subject: str
    message: str

@router.post("/")
async def send_contact(data: ContactRequest):
    try: 
        r = resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": "hello.budgetflo@gmail.com",
        "subject": f"[BudgetFlow] {data.subject}",
        "html": f"<p>{data.message}</p>"
        })
        return {"message": "Your message has been sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send email")
