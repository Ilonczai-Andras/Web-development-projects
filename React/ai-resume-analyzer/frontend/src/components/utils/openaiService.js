export async function getCvSuggestions(resumeText, jobDescription) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // Put in .env file
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "You are a helpful AI resume reviewer." },
          { role: "user", content: `Here is a resume:\n\n${resumeText}\n\nHere is the job description:\n\n${jobDescription}\n\nSuggest improvements for the resume to better match the job.` }
        ]
      }),
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  }
  