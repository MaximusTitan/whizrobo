export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-12 py-16 px-8 bg-white dark:bg-black sm:px-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            Android Robot Control via REST API
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Control your Android-based robot remotely using REST API calls
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            How It Works
          </h2>
          <div className="flex flex-col gap-4 text-zinc-700 dark:text-zinc-300">
            <p>
              The Android robot runs a web server that listens for HTTP
              requests. When you send REST API calls to the robot's IP address,
              it processes the commands and executes actions like movement,
              sensor readings, or other robot functions.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="text-xl font-medium text-black dark:text-zinc-50">
                Architecture
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Android device runs a REST API server (e.g., using Flask,
                  Express, or native Android HTTP server)
                </li>
                <li>
                  Robot receives HTTP requests on a specific port (commonly 8080
                  or 5000)
                </li>
                <li>Commands are sent as JSON payloads in POST requests</li>
                <li>Robot responds with status codes and data (JSON format)</li>
                <li>
                  Both devices must be on the same network or accessible via IP
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Example API Endpoints
          </h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                Move Forward
              </h3>
              <code className="block bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                POST http://ROBOT_IP:8080/api/move
                <br />
                Body: {"{"}"direction": "forward", "speed": 50, "duration": 2000
                {"}"}
              </code>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                Turn Left/Right
              </h3>
              <code className="block bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                POST http://ROBOT_IP:8080/api/turn
                <br />
                Body: {"{"}"direction": "left", "angle": 90{"}"}
              </code>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                Stop Robot
              </h3>
              <code className="block bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                POST http://ROBOT_IP:8080/api/stop
              </code>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                Get Sensor Data
              </h3>
              <code className="block bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                GET http://ROBOT_IP:8080/api/sensors
              </code>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                Get Robot Status
              </h3>
              <code className="block bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                GET http://ROBOT_IP:8080/api/status
              </code>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Setup Instructions
          </h2>
          <div className="flex flex-col gap-4 text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                1. Android Robot Setup
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Install a web server framework on Android (Flask, Express.js,
                  or native Android HTTP server)
                </li>
                <li>Create API endpoints that handle robot commands</li>
                <li>
                  Connect robot hardware (motors, sensors) to Android device
                </li>
                <li>Start the server and note the robot's IP address</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                2. Network Configuration
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ensure both devices are on the same Wi-Fi network</li>
                <li>
                  Find the robot's IP address (Settings → About → Status on
                  Android)
                </li>
                <li>
                  Configure firewall to allow incoming connections on the server
                  port
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-zinc-50 mb-2">
                3. Making API Calls
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use fetch() or axios in JavaScript/TypeScript</li>
                <li>
                  Send POST requests for commands, GET requests for status
                </li>
                <li>Include JSON payloads for command parameters</li>
                <li>Handle responses and errors appropriately</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Example Request (JavaScript)
          </h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6">
            <code className="block text-sm whitespace-pre-wrap">
              {`const robotIP = "192.168.1.100";
const port = 8080;

async function moveRobot(direction, speed, duration) {
  try {
    const response = await fetch(
      \`http://\${robotIP}:\${port}/api/move\`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          direction: direction,
          speed: speed,
          duration: duration,
        }),
      }
    );
    
    const data = await response.json();
    console.log("Robot response:", data);
    return data;
  } catch (error) {
    console.error("Error controlling robot:", error);
  }
}

moveRobot("forward", 50, 2000);`}
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}
