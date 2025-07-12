function sendSwapRequest(itemId) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("Please log in to send a swap request.");
    window.location.href = "login.html";
    return;
  }

  fetch("http://localhost:5000/api/swap/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ itemId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === "Swap request sent") {
      alert("✅ Swap request sent to owner!");
    } else {
      alert("⚠️ " + (data.message || "Request failed"));
    }
  })
  .catch(err => {
    alert("❌ Server error.");
    console.error(err);
  });
}
