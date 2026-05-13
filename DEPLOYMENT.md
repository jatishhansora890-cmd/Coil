
# 🚀 Step-by-Step Deployment Guide (Zero Experience Required)

Follow these steps exactly to make your app live and **save your data permanently**.

---

## Part 1: Download & Upload (Get your code on GitHub)

**IF YOU CANNOT FIND THE DOWNLOAD ICON ON MOBILE:**
1.  **Rotate your phone** to Landscape (Horizontal) mode. This usually makes the missing icons appear.
2.  **Tap the `</>` (Code icon)** next to the blue Publish button. Look inside that menu for a download or export option.
3.  **Last Resort**: Tap the blue **"Move now"** button in the banner at the top of your screen. This will move your code to Google AI Studio/GitHub automatically.

**ON DESKTOP:**
1.  **FIND THE DOWNLOAD BUTTON**: Look at the **TOP RIGHT CORNER**. Click the **Cloud icon with a downward arrow** (next to the "Publish" button).
2.  **Extract Files**: Once you have the `.zip` file, open it on your computer to see your project folders.
3.  **Go to GitHub**: Go to [GitHub.com](https://github.com) and log in.
4.  **Create a New Repository**:
    *   Click the **"+"** icon (top right) -> **"New repository"**.
    *   **Name**: `alloy-stream-pro`.
    *   Click **"Create repository"**.
5.  **Upload Files**:
    *   Click the link **"uploading an existing file"**.
    *   Drag and drop ALL the files from your extracted folder into the upload box.
    *   Click **"Commit changes"** (green button at the bottom).

---

## Part 2: Connect to Vercel (FIX DATA ERASING)

1.  **Go to Vercel**: Visit [Vercel.com](https://vercel.com) and sign in with GitHub.
2.  **Import Project**: Find `alloy-stream-pro` and click **"Import"**.
3.  **CRITICAL STEP: SET ENVIRONMENT VARIABLES**:
    Before clicking Deploy, click the **"Environment Variables"** dropdown. You MUST add these keys from your [Firebase Console](https://console.firebase.google.com):

    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`
    - `GEMINI_API_KEY` (Your Google AI Key)

4.  **Deploy**: Click **"Deploy"**.

---

## Part 3: Ongoing Updates (How to sync new changes)

When we make improvements in this chat, your live website **will not update automatically**. You must:

1.  **Download the new code** from this AI Studio (using the **Cloud/Download** icon or the **Move Now** button).
2.  **Go to your GitHub repository** page in your browser.
3.  **Click "Add file" -> "Upload files"**.
4.  **Drag and drop the files** that were changed (or just upload everything again).
5.  **Click "Commit changes"**.
6.  **Vercel will see the change** and update your live website automatically. Look for the "v2.5.2-Update" date in your app footer to verify the update.
