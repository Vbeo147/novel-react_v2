export default function WriteForm({
  loading,
  onFileChange,
  onChange,
  onSubmit,
  onClearAttachment,
  attachment,
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
            required
            autoComplete="off"
            ref={titleRef}
            spellcheck="false"
          />
        </div>
        <div className="components_input_text_container">
          <textarea
            onChange={onChange}
            type="text"
            ref={textRef}
            autoComplete="off"
            required
            spellcheck="false"
          ></textarea>
        </div>
        <div className="components_input_file_container">
          <div className="components_input_label_container">
            <label htmlFor="ex_file">Picture</label>
            <input
              id="ex_file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
          {attachment && (
            <div className="preview_img_container">
              <img src={attachment} alt="" />
              <button
                className="components_form_input_submit"
                onClick={onClearAttachment}
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <div className="components_button_container">
          <button type="submit" disabled={loading}>
            Enter
          </button>
          <button type="button" onClick={onHome}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}
