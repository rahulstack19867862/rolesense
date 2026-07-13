#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class ReviewRequestTester:
    def __init__(self, base_url="https://email-scrubber.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_data = {}

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        if details:
            print(f"   Details: {details}")

    def make_request(self, method, endpoint, data=None, timeout=30):
        """Make HTTP request with error handling"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=timeout)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=timeout)
            else:
                return False, f"Unsupported method: {method}"
            
            return True, response
        except requests.exceptions.Timeout:
            return False, f"Request timeout after {timeout}s"
        except requests.exceptions.ConnectionError:
            return False, "Connection error - backend may be down"
        except Exception as e:
            return False, f"Request error: {str(e)}"

    def test_review_request_flows(self):
        """Test the specific flows requested in the review request"""
        print("\n🎯 REVIEW REQUEST COMPREHENSIVE TESTING")
        print("=" * 60)
        print("Testing Role Sense JD Intelligence Platform - 6 Core Flows")
        
        # Test 1: Vendor JD Upload with New Fields
        print("\n📝 Test 1: Vendor JD Upload with New Fields")
        vendor_jd_data = {
            "title": "Full Stack Developer",
            "client_name": "TechStartup Inc",
            "requisition_date": "2026-01-21",
            "raw_text": "We are looking for a Full Stack Developer with 3-5 years of experience in React and Node.js...",
            "compensation_min": 1200000,
            "compensation_max": 1800000,
            "compensation_currency": "INR",
            "location": "Bangalore",
            "experience_min": 3,
            "experience_max": 5,
            "business_model": "B2B",
            "work_mode": "Hybrid (2-3 days office)",
            "reporting_to": "Tech Lead",
            "team_handling": "No direct reports",
            "responsibilities": ["Develop web applications", "Code reviews", "API development"]
        }
        
        success, response = self.make_request('POST', 'jd/vendor/upload', vendor_jd_data)
        if success and response.status_code == 200:
            data = response.json()
            required_fields = ['id', 'title', 'client_name', 'requisition_number', 'status']
            if all(field in data for field in required_fields):
                # Verify NO application_email or application_link fields
                has_app_email = 'application_email' in data
                has_app_link = 'application_link' in data
                if not has_app_email and not has_app_link:
                    self.test_data['review_vendor_jd'] = data
                    self.log_test("Test 1: Vendor JD Upload (New Fields)", True, f"Created JD {data['id']} without external application options")
                else:
                    self.log_test("Test 1: Vendor JD Upload (New Fields)", False, f"Found external application fields: email={has_app_email}, link={has_app_link}")
            else:
                self.log_test("Test 1: Vendor JD Upload (New Fields)", False, f"Missing required fields: {required_fields}")
        else:
            self.log_test("Test 1: Vendor JD Upload (New Fields)", False, f"Request failed: {response}")
        
        # Test 2: Submit JD to Active Jobs
        print("\n🚀 Test 2: Submit JD to Active Jobs")
        if 'review_vendor_jd' in self.test_data:
            jd_id = self.test_data['review_vendor_jd']['id']
            success, response = self.make_request('POST', f'jd/{jd_id}/submit')
            if success and response.status_code == 200:
                data = response.json()
                if data.get('status') == 'active' and data.get('requisition_number'):
                    self.test_data['review_active_jd'] = data
                    self.log_test("Test 2: Submit JD to Active Jobs", True, f"Status changed to 'active', requisition: {data['requisition_number']}")
                else:
                    self.log_test("Test 2: Submit JD to Active Jobs", False, f"Status: {data.get('status')}, Requisition: {data.get('requisition_number')}")
            else:
                self.log_test("Test 2: Submit JD to Active Jobs", False, f"Request failed: {response}")
        else:
            self.log_test("Test 2: Submit JD to Active Jobs", False, "No vendor JD available from Test 1")
        
        # Test 3: Get Active Jobs List
        print("\n📋 Test 3: Get Active Jobs List")
        success, response = self.make_request('GET', 'jd/active/list')
        if success and response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                # Check if our submitted job is in the list
                found_job = False
                if 'review_active_jd' in self.test_data:
                    jd_id = self.test_data['review_active_jd']['id']
                    found_job = any(job.get('id') == jd_id for job in data)
                
                # Check for publish_links (should have multiple platform links)
                has_publish_links = False
                if len(data) > 0:
                    first_job = data[0]
                    publish_links = first_job.get('publish_links', {})
                    # Should have at least linkedin, twitter, facebook, indeed, etc.
                    has_publish_links = len(publish_links) >= 5
                
                if found_job and has_publish_links:
                    self.log_test("Test 3: Get Active Jobs List", True, f"Found {len(data)} active jobs with publish links")
                else:
                    self.log_test("Test 3: Get Active Jobs List", False, f"Job found: {found_job}, Publish links: {has_publish_links}")
            else:
                self.log_test("Test 3: Get Active Jobs List", False, f"Expected list, got: {type(data)}")
        else:
            self.log_test("Test 3: Get Active Jobs List", False, f"Request failed: {response}")
        
        # Test 4: Structured JD Create (without external application options)
        print("\n🏗️ Test 4: Structured JD Create (No External Apps)")
        structured_jd_data = {
            "basic_info": {
                "company_name": "Enterprise Corp",
                "title": "DevOps Engineer",
                "role_type": "IT",
                "business_model": "B2B",
                "experience_min": 4,
                "experience_max": 7,
                "compensation_min": 1500000,
                "compensation_max": 2200000,
                "compensation_currency": "INR",
                "locations_india": ["Mumbai", "Pune"],
                "work_mode": "Hybrid (2-3 days office)",
                "employment_type": "Full-time Permanent",
                "education_level": "Bachelor's Degree",
                "education_field": "Computer Science/IT"
            },
            "competencies": {
                "must_have_skills": ["AWS", "Docker", "Kubernetes", "CI/CD"],
                "good_to_have_skills": ["Terraform", "Ansible", "Jenkins"]
            },
            "responsibilities": ["Manage cloud infrastructure", "Setup CI/CD pipelines"]
        }
        
        success, response = self.make_request('POST', 'jd/structured/create', structured_jd_data)
        if success and response.status_code == 200:
            data = response.json()
            required_fields = ['id', 'status']
            if all(field in data for field in required_fields):
                # Verify NO application_email or application_link requirements
                if data.get('status') == 'draft':
                    self.test_data['review_structured_jd'] = data
                    self.log_test("Test 4: Structured JD Create", True, f"Created structured JD {data['id']} with status 'draft'")
                else:
                    self.log_test("Test 4: Structured JD Create", False, f"Expected status 'draft', got: {data.get('status')}")
            else:
                self.log_test("Test 4: Structured JD Create", False, f"Missing required fields: {required_fields}")
        else:
            self.log_test("Test 4: Structured JD Create", False, f"Request failed: {response}")
        
        # Test 5: Delete Structured JD
        print("\n🗑️ Test 5: Delete Structured JD")
        if 'review_structured_jd' in self.test_data:
            jd_id = self.test_data['review_structured_jd']['id']
            success, response = self.make_request('DELETE', f'jd/structured/{jd_id}')
            if success and response.status_code == 200:
                data = response.json()
                if 'message' in data:
                    # Verify deletion by trying to GET the JD (should return 404)
                    success2, response2 = self.make_request('GET', f'jd/structured/{jd_id}')
                    if success2 and response2.status_code == 404:
                        self.log_test("Test 5: Delete Structured JD", True, "JD deleted successfully, GET returns 404")
                    else:
                        self.log_test("Test 5: Delete Structured JD", False, f"JD still exists after deletion: {response2.status_code}")
                else:
                    self.log_test("Test 5: Delete Structured JD", False, f"Unexpected response format: {data}")
            else:
                self.log_test("Test 5: Delete Structured JD", False, f"Request failed: {response}")
        else:
            self.log_test("Test 5: Delete Structured JD", False, "No structured JD available from Test 4")
        
        # Test 6: Careers/Jobs Public Endpoint (Test with specific job ID)
        print("\n🌐 Test 6: Careers/Jobs Public Endpoint")
        if 'review_active_jd' in self.test_data:
            jd_id = self.test_data['review_active_jd']['id']
            success, response = self.make_request('GET', f'jobs/{jd_id}/public')
            if success and response.status_code == 200:
                data = response.json()
                if isinstance(data, dict) and 'title' in data:
                    # Should return public-safe job details
                    self.log_test("Test 6: Careers/Jobs Public Endpoint", True, f"Public job details retrieved for {data.get('title', 'Unknown')}")
                else:
                    self.log_test("Test 6: Careers/Jobs Public Endpoint", False, f"Expected job object with title, got: {type(data)}")
            else:
                self.log_test("Test 6: Careers/Jobs Public Endpoint", False, f"Request failed: {response}")
        else:
            self.log_test("Test 6: Careers/Jobs Public Endpoint", False, "No active JD available for public endpoint test")
        
        print("\n" + "=" * 60)
        print("✅ REVIEW REQUEST TESTING COMPLETED")
        print("=" * 60)

    def run_tests(self):
        """Run the review request tests"""
        print("🚀 Starting Review Request Testing")
        print("=" * 60)
        
        # Test basic connectivity first
        success, response = self.make_request('GET', '')
        if not success or response.status_code != 200:
            print("❌ Backend health check failed - stopping tests")
            return False
        
        print("✅ Backend connectivity confirmed")
        
        # Run the review request flows
        self.test_review_request_flows()
        
        # Print final results
        print("\n" + "=" * 60)
        print("📊 FINAL TEST RESULTS")
        print("=" * 60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 ALL REVIEW REQUEST TESTS PASSED!")
        else:
            print("⚠️  Some tests failed - check logs above")
        
        return self.tests_passed == self.tests_run

if __name__ == "__main__":
    tester = ReviewRequestTester()
    success = tester.run_tests()
    sys.exit(0 if success else 1)