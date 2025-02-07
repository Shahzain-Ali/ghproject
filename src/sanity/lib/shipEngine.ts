import ShipEngine from "shipengine";

if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("SHIPENGINE_API_KEY is not set");
}

const shipengine = new ShipEngine(
    {
        apiKey: process.env.SHIPENGINE_API_KEY as string
    }
);

export default shipengine;
