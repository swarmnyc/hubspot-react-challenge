# HubSpot Data Setup Guide

This guide explains how to add events to HubSpot so they appear on your website.

---

## Events Setup

Events require creating a custom object in HubSpot to store event information.

### Step 1: Create the Events Custom Object

1. Go to **Settings** (gear icon)
2. Click **Data Management** → **Custom Objects**
3. Click **Create custom object**
4. Enter:
   - Singular name: `Event`
   - Plural name: `Events`
   - Primary display property: `Event Title`
5. Click **Create**

### Step 2: Add Event Properties

1. After creating, you'll see the Events object settings page
2. Click **"Manage Event properties"**
3. Click **Create property**

**For each property, fill in the form:**

- **Property label**: Enter the name (e.g., "Description")
- **Field type**: Select the type from the dropdown
- **Rules**: Leave default settings
- **Manage access**: Keep "Allow everyone to view and edit"
- Click **Create**

**Create these properties one by one:**

| Property Label | Field Type | Notes |
|---------------|------------|-------|
| Description | Multi-line text | For event details |
| Event Date | Date picker | When the event happens |
| Event Time | Single-line text | e.g., "14:00" or "2:00 PM" |
| Event Type | Dropdown select | Add options after creating |
| Location | Single-line text | Physical address or "Online" |
| Is Virtual | Single checkbox | Check if online event |
| Registration URL | URL | Link to sign up |
| Image URL | URL | Link to event image |
| Speakers | Multi-line text | Names separated by commas |
| Capacity | Number | Max attendees |
| Registered Count | Number | Current signups |

**For the Event Type dropdown:**

After creating the property, click on it to edit and add these options:

- webinar
- workshop
- conference
- meetup

### Step 3: Add Events

You can add events manually or import them from a CSV file.

#### Option A: Import Events from CSV (Recommended)

A sample CSV file is included: `sample-events-import.csv`

1. Go to **CRM** → **Events** (your custom object)
2. Click **Add event** button
3. Select **Import** (not "Create new")
4. Choose **"One-time import from a file—directly into your CRM"**
5. Click **Start import**
6. Select **Events** and press **Next**
7. Upload the CSV file
8. Map the columns to your Event properties
9. For **Event Date**, select date format: **month day year** with `/` separator
10. Complete the import

#### Option B: Create Events Manually

1. Go to **CRM** → **Events** (your custom object)
2. Click **Add event** → **Create new**
3. Fill in the event details:

**Example event:**

- Event Title: `Introduction to HubSpot CMS`
- Description: `Learn the fundamentals of building websites...`
- Event Date: `12/15/2025`
- Event Time: `14:00`
- Event Type: `webinar`
- Location: `Online via Zoom`
- Is Virtual: ✅
- Registration URL: `https://yoursite.com/register`
- Speakers: `John Smith, Jane Doe` (comma-separated)
- Capacity: `100`
- Registered Count: `45`

4. Click **Create**
5. Repeat for each event

---

## Viewing Your Data

After adding data to HubSpot:

1. Deploy your website to HubSpot
2. Create or edit a page using your theme
3. Add the **Events & Webinars Grid** module
4. Your HubSpot data will appear automatically

---

## Tips

- Past events can be shown or hidden using the module settings
- Use full URLs for registration links
- Separate multiple speaker names with commas

---

## Troubleshooting

**No events showing?**

- Check that the Events custom object was created correctly
- Make sure events have at least: title, date, time, and type

**Images not appearing?**

- Use full image URLs (starting with https://)

---

## Need Help?

- [HubSpot Contact Management Guide](https://knowledge.hubspot.com/contacts/create-contacts)
- [HubSpot Custom Objects Guide](https://knowledge.hubspot.com/crm-setup/create-custom-objects)
- [HubSpot Support](https://help.hubspot.com/)
