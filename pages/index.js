import useOffline from "../hooks/useOffline";
import useMutation from "../hooks/useMutation";

async function fetcher(payload) {
  console.log("saveDoc", payload);
  const response = await fetch("/api/rki", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new Error("Beim Laden der Daten ist ein Fehler aufgetreten.");
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export default function IndexPage() {
  const offline = useOffline();
  const [saveDoc, { data, isLoading, error }] = useMutation(fetcher);

  console.log(data, isLoading, error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    saveDoc(Object.fromEntries(data));
    event.target.reset();
  };

  return (
    <>
      <h1>Background Sync POC</h1>
      <section>
        <h2>Offline State</h2>
        <div>You are {offline ? "offline" : "online"}</div>
      </section>

      <section>
        <h2>Input</h2>
        <form onSubmit={handleSubmit}>
          <input name="label" type="text" />
          <button disabled={isLoading}>Add</button>
        </form>
      </section>

      {error && (
        <section>
          <h2>Error</h2>
          <pre>{JSON.stringify(error)}</pre>
        </section>
      )}

      {data && (
        <section>
          <h2>Response</h2>
          <pre>{JSON.stringify(data)}</pre>
        </section>
      )}
    </>
  );
}
