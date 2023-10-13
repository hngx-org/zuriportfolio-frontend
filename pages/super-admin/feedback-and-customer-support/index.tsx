import GeneralComplaints from './general-complaints';

export default function Complaintss() {
  const complainData = {
    id: 1, // ID of the complaint
    status: 'pending', // Status of the complaint (e.g., "pending" or "resolved")
    message: 'Complaint retrieved successfully', // A message describing the complaint
    data: {
      user: '109f3686-c72a-4d7a-92bd-f91800dd83d3', // User information
      product: null, // Product information (can be null)
      complaint_text:
        'Decade again may. Toward wear data serve black treat onto. Once share happy space.\nState hotel civil nation tax against tree. Measure enter media charge recent.',
      status: 'pending',
      user_details: {
        id: '109f3686-c72a-4d7a-92bd-f91800dd83d3', // User details
        first_name: 'Megan',
        last_name: 'Dunn',
        email: 'melissaguzman@example.org',
        profile_pic: 'https://placekitten.com/197/625',
      },
      createdAt: '2023-10-12T21:12:40.849200Z',
      updatedAt: '2023-10-12T21:12:40.849200Z',
    },
  }; // Replace {} with your actual data
  return <GeneralComplaints complain={complainData} />;
}
