<script>
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => alert(`${text} copied to clipboard!`))
      .catch(err => console.error('Clipboard copy failed:', err));
  }
</script>