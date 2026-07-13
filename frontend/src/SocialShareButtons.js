import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Copy, Check, ExternalLink } from 'lucide-react';

const SocialShareButtons = ({ job }) => {
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  
  // Generate public job application link
  const getPublicJobLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/jobs/${job.id}/apply`;
  };

  // Generate post content for each platform
  const generateContent = (platform) => {
    const title = job.title || job.basic_info?.title || 'Job Opening';
    const company = job.company || job.company_name || job.client_name || job.basic_info?.company_name || '';
    const location = job.location || job.parsed_data?.location || 
                    (job.basic_info?.locations_india?.join(', ')) || 
                    'India';
    
    // Get experience
    let experience = '';
    if (job.basic_info?.experience_min !== undefined) {
      experience = `${job.basic_info.experience_min}-${job.basic_info.experience_max} years`;
    } else if (job.parsed_data?.experience_years) {
      const exp = job.parsed_data.experience_years;
      experience = exp.min ? `${exp.min}${exp.max ? '-' + exp.max : '+'} years` : '';
    } else if (job.experience_required) {
      experience = job.experience_required;
    }
    
    // Get skills
    const skills = job.must_have_skills?.slice(0, 3) ||
                   job.competencies?.must_have_skills?.slice(0, 3) || 
                   job.parsed_data?.required_skills?.slice(0, 3) || 
                   [];
    const skillsText = skills.join(', ');
    
    // Public apply link
    const applyLink = getPublicJobLink();

    if (platform === 'linkedin') {
      return `🚀 We're Hiring: ${title}

🏢 Company: ${company}
📍 Location: ${location}
💼 Experience: ${experience}
🛠️ Skills: ${skillsText}

🔗 Apply Now: ${applyLink}

If you're interested or know someone who would be perfect for this role, please reach out!

#Hiring #${title.replace(/\s+/g, '')} #Jobs #Career #Opportunity #OpenToWork`;
    }
    
    if (platform === 'twitter') {
      let tweet = `🚀 We're Hiring: ${title} at ${company}!

📍 ${location}
💼 ${experience}

🔗 Apply: ${applyLink}

#Hiring #Jobs #OpenToWork`;
      
      // Truncate if too long
      if (tweet.length > 280) {
        tweet = `🚀 Hiring: ${title}!
📍 ${location}
🔗 ${applyLink}
#Hiring #Jobs`;
      }
      return tweet;
    }
    
    if (platform === 'facebook') {
      return `🎯 Job Opening: ${title}

We're looking for talented professionals to join ${company}!

📍 Location: ${location}
💼 Experience: ${experience}
🛠️ Key Skills: ${skillsText}

🔗 Apply Now: ${applyLink}

Know someone perfect for this role? Tag them in the comments! 👇

#Hiring #Jobs #Career`;
    }
    
    return '';
  };

  const handleShare = async (platform) => {
    const content = generateContent(platform);
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPlatform(platform);
      
      // Open the social media compose page
      let url = '';
      if (platform === 'linkedin') {
        // LinkedIn new post page
        url = 'https://www.linkedin.com/feed/?shareActive=true';
      } else if (platform === 'twitter') {
        // Twitter compose - this one works with pre-filled text
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
      } else if (platform === 'facebook') {
        // Facebook - open feed to create post
        url = 'https://www.facebook.com/';
      }
      
      // Open in new tab
      window.open(url, '_blank');
      
      // Show success message
      setTimeout(() => {
        if (platform === 'linkedin' || platform === 'facebook') {
          alert(`✅ Content copied to clipboard!\n\n📋 Now paste (Ctrl+V / Cmd+V) in the ${platform === 'linkedin' ? 'LinkedIn' : 'Facebook'} post box and click Post.`);
        }
      }, 500);
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopiedPlatform(null), 3000);
      
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy content. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396] transition-all text-sm font-medium"
        >
          {copiedPlatform === 'linkedin' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Linkedin className="w-4 h-4" />
          )}
          {copiedPlatform === 'linkedin' ? 'Copied!' : 'LinkedIn'}
          <Copy className="w-3 h-3 opacity-70" />
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => handleShare('twitter')}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
        >
          {copiedPlatform === 'twitter' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Twitter className="w-4 h-4" />
          )}
          {copiedPlatform === 'twitter' ? 'Copied!' : 'Tweet'}
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all text-sm font-medium"
        >
          {copiedPlatform === 'facebook' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Facebook className="w-4 h-4" />
          )}
          {copiedPlatform === 'facebook' ? 'Copied!' : 'Facebook'}
          <Copy className="w-3 h-3 opacity-70" />
        </button>
        
        {/* Copy Direct Link */}
        <button
          onClick={async () => {
            const link = getPublicJobLink();
            await navigator.clipboard.writeText(link);
            setCopiedPlatform('link');
            setTimeout(() => setCopiedPlatform(null), 2000);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium"
        >
          {copiedPlatform === 'link' ? (
            <Check className="w-4 h-4" />
          ) : (
            <ExternalLink className="w-4 h-4" />
          )}
          {copiedPlatform === 'link' ? 'Link Copied!' : 'Copy Job Link'}
        </button>
      </div>
      
      {/* Public Job Link Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
        <p className="text-xs text-gray-600 mb-1 font-medium">📎 Public Job Link (for sharing):</p>
        <code className="text-xs text-indigo-700 bg-white px-2 py-1 rounded border break-all block">
          {getPublicJobLink()}
        </code>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>📋 How to post:</strong>
        </p>
        <ol className="text-xs text-blue-700 mt-1 space-y-0.5 list-decimal list-inside">
          <li>Click a button above → Content is copied & site opens</li>
          <li>Click in the "Start a post" / "What's happening?" box</li>
          <li>Paste with <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Ctrl+V</kbd> (or <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">Cmd+V</kbd> on Mac)</li>
          <li>Click <strong>Post</strong> / <strong>Tweet</strong> to publish!</li>
        </ol>
      </div>
    </div>
  );
};

export default SocialShareButtons;
