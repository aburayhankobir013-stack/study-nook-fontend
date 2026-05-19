import Marquee from "react-fast-marquee";

const messages = [
  "📚 Book your perfect study space anytime, anywhere.",
  "🕒 Study rooms are available 24/7 for registered students.",
  "📖 Smart booking system for a smarter learning experience.",
  "🎯 Manage study sessions efficiently with Study Nook.",
];

export default function LiveMessage() {
  return (
    <div className="container mx-auto py-2 flex flex-col gap-2">
      <h1 className="text-center font-extrabold text-xl text-green-500">IMPORTENT MESSAGE</h1>
      <Marquee className="border-2 py-2 rounded-xs bg-green-100 font-semibold text-green-900 uppercase"
      pauseOnHover={true}>
        {
          messages.map((message, index) => <p key={index} className="ml-5">{message}</p>)
        }
      </Marquee>
    </div>
  );
}
