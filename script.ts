// Ensure html2pdf is globally available
declare const html2pdf: any;

// Get form and preview elements
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeobject =document.getElementById("resumeobject") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeAddress =document.getElementById("resumeAddress") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const resumeHobbies = document.getElementById("resumeHobbies") as HTMLParagraphElement;
const resumeLanguage = document.getElementById("resumeLanguage") as HTMLParagraphElement;
const resumeLinks = document.getElementById("resumeLinks") as HTMLParagraphElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const backButton = document.getElementById("backButton") as HTMLButtonElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;


// Handle form submission
form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Collect form values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const object =(document.getElementById("object") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address =(document.getElementById("address") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const hobbies =(document.getElementById("hobbies") as HTMLTextAreaElement).value;
    const language =(document.getElementById("language") as HTMLInputElement).value;
    const links =(document.getElementById("links") as HTMLInputElement).value;
    const photoInput = document.getElementById("photo") as HTMLInputElement;

    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';

    if (photoFile) {
        photoBase64 = await fileToBase64(photoFile);
        // Store the photo in localStorage instead of passing it in the URL
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }

    // Populate the resume preview
    resumeName.textContent = name;
    resumeobject.textContent= object;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeAddress.textContent =`Address:${address}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    resumeHobbies.textContent =hobbies;
    resumeLanguage.textContent =`Language:${language}`
    resumeLinks.textContent = links;

    // Hide form and show resume page
    document.querySelector(".container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");

});


// Convert photo to Base64
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Add back button functionality to go back to the form
backButton.addEventListener("click", () => {
    // Show the form again and hide the resume preview
    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");

    // Optionally clear query parameters
    window.history.replaceState(null, '', '/');
});

// Add edit button functionality
editButton.addEventListener("click", () => {
    // Populate the form with current resume data for editing
    updateFormFromResume();

    // Show the form again for editing
    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");
});

// Function to update the form fields with current resume data
function updateFormFromResume() {
    const [degree, education] = resumeEducation.textContent?.split(" from ") || [];
    (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("object") as HTMLInputElement).value = resumeobject.textContent || '';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace('Email: ', '') || '';
    (document.getElementById("phone") as HTMLInputElement).value = resumePhone.textContent?.replace('Phone: ', '') || '';
    (document.getElementById("address") as HTMLInputElement).value=resumeAddress.textContent?.replace('Address','') || '';
    (document.getElementById("degree") as HTMLInputElement).value = degree || '';
    (document.getElementById("education") as HTMLInputElement).value = education || '';
    (document.getElementById("workExperience") as HTMLTextAreaElement).value = resumeWorkExperience.textContent || '';
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
    (document.getElementById("hobbies") as HTMLTextAreaElement).value =resumeHobbies.textContent || '';
    (document.getElementById("language") as HTMLInputElement).value =resumeLanguage.textContent || '';
    (document.getElementById("links") as HTMLInputElement).value = resumeLinks.textContent || '';
}

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }

    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error: Error) => {
            console.error('PDF generation error:', error);
        });
});

// Handle query parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const object =params.get('object') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const address =params.get('address') || '';
    const degree = params.get('degree') || '';
    const education = params.get('education') || '';
    const workExperience = params.get('workExperience') || '';
    const skills = params.get('skills') || '';
    const hobbies =params.get ('hobbies') || '';
    const language =params.get('language') || '';
    const links =params.get('links') || '';

    if (name || email || phone || degree || education || workExperience || skills) {
        // Populate the resume preview if query params are present
        resumeName.textContent = name;
        resumeobject.textContent = object;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeAddress.textContent =`Address: ${address}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        resumeHobbies.textContent =hobbies;
        resumeLanguage.textContent =`Language: ${language}`;
        resumeLinks.textContent =links;

        // Retrieve photo from localStorage (if available)
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumePhoto.src = savedPhoto;
        }

        // Hide form and show resume page
        document.querySelector(".container")?.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});

// CSS for ensuring the image is styled properly
resumePhoto.style.width = "150px";  // Adjust width as per your requirement
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%";  // Circular image
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";