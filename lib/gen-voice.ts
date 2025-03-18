import elevenlabs from "./init-eleven-labs";

export default async function genVoice({
  voiceId,
  text,
  emotion,
  language = "en"
}: {
  voiceId: string;
  text: string;
  emotion?: string;
  language?: "en" | "es" | "fr" | "de";
}) {
  try {
    const audio = await elevenlabs.generate({
      voice: voiceId,
      text: `"${text}"`,
      model_id: "eleven_multilingual_v2", // Multilingual model supporting English, Spanish, French, German and more
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.75,
        use_speaker_boost: true,
      },
      next_text: `, ${emotion}`,
    });
    console.log("Generated voice", { voiceId, text, emotion, language });

    return audio;
  } catch (error) {
    console.log("Error generating voice: " + error);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  genVoice({
    voiceId: "N2lVS1w4EtoT3dr4eOWO",
    text: "Hello, world! This is a test.",
    emotion: "they said with excitement.",
    language: "en"
  }).then(console.log);
}

