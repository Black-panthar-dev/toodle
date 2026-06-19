export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "42rem",
          border: "1px solid #e2e8f0",
          borderRadius: "1rem",
          padding: "2rem",
          background: "#ffffff",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Toodle</h1>
        <p style={{ lineHeight: 1.6, color: "#475569" }}>
          The project foundation is set up and ready for the LMS build phases.
        </p>
      </section>
    </main>
  );
}
