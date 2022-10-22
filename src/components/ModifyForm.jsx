export default function ModifyForm({
  onSubmit,
  onChange,
  Value,
  titleRef,
  textRef,
  onHome,
}) {
  return (
    <>
      <form onSubmit={onSubmit} className="components_input_container">
        <div className="components_input_title_container">
          <input
            onChange={onChange}
            type="text"
            placeholder="제목"
            value={Value.title || ""}
            ref={titleRef}
            required
            spellcheck="false"
          />
        </div>
        <div className="components_input_text_container">
          <textarea
            onChange={onChange}
            value={Value.text || ""}
            ref={textRef}
            required
            spellcheck="false"
          ></textarea>
        </div>
        <div className="components_button_container">
          <button type="submit">Modify</button>
          <button type="button" onClick={() => onHome()}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}
