import asyncio
import websockets
import json

async def handler(ws):
    print("client connected")
    try:
        async for message in ws:
            data = json.loads(message)
            print(f"Received message: {data}")
    except websockets.exceptions.ConnectionClosed:
        print("client disconnected")
async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket server started on ws://localhost:8765")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())