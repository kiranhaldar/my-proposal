import streamlit as st
import streamlit.components.v1 as components

# Page config
st.set_page_config(
    page_title="A Little Question 💗",
    page_icon="💗",
    layout="centered"
)

# Hide Streamlit default UI (menu, footer)
hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {padding: 0 !important; max-width: 100% !important;}
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Read the HTML file
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Read CSS and JS
with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# Inline CSS and JS into the HTML (so it works inside iframe)
html_content = html_content.replace(
    '<link rel="stylesheet" href="style.css">',
    f'<style>{css_content}</style>'
)
html_content = html_content.replace(
    '<script src="script.js"></script>',
    f'<script>{js_content}</script>'
)

# Render HTML
components.html(html_content, height=800, scrolling=False)

# Your name credit
st.markdown(
    """
    <div style='text-align:center; color:#c39aaa; font-size:0.75rem; padding:10px;'>
    Made with 💞 by <b>Your Name</b>
    </div>
    """,
    unsafe_allow_html=True
)