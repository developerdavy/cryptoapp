# Card Payment Troubleshooting Guide

## Recent Updates Made

### ✅ Enhanced Billing Address Collection
- Added complete billing address fields to checkout form
- Address, city, and country selection now required
- Dynamic country code mapping for international payments

### ✅ Improved Payment Data Structure
- Enhanced billing_address object with all required fields
- Added explicit payment method specifications
- Improved error logging and debugging

### ✅ Better User Experience
- Added clear instructions about billing address requirements
- Updated payment method description
- Enhanced form validation

## Common Card Payment Issues & Solutions

### 1. **Incomplete Billing Information**
**Problem**: Card payments require complete billing address
**Solution**: ✅ Fixed - Now collecting full address, city, country

### 2. **Merchant Account Limits**
**Problem**: New Pesapal accounts have transaction limits
**Solution**: Contact Pesapal support to increase limits or verify account

### 3. **Card Type Restrictions**
**Problem**: Some cards may not be enabled for online payments
**Solution**: Ensure cards are enabled for online/international transactions

### 4. **Currency Mismatch**
**Problem**: Card currency doesn't match transaction currency
**Solution**: Pesapal handles currency conversion automatically

## Testing Card Payments

### Test with Real Cards:
1. Use a real credit/debit card with online payments enabled
2. Ensure card has sufficient balance
3. Complete all billing address fields accurately
4. Try different card types (Visa, Mastercard, etc.)

### Monitor Logs:
- Check console for detailed Pesapal responses
- Look for specific error messages
- Verify IPN notifications are received

## Next Steps if Issues Persist

### 1. **Contact Pesapal Support**
- Log into your Pesapal merchant dashboard
- Check for account verification requirements
- Verify merchant account status
- Request card payment enablement if needed

### 2. **Test Environment**
- Consider testing with Pesapal sandbox first
- Switch to sandbox mode for testing: Change `pesapalEnvironment = 'sandbox'`
- Use Pesapal test cards

### 3. **Check Merchant Configuration**
- Verify merchant account is fully activated
- Check if international card payments are enabled
- Ensure proper business verification is complete

## Current Status
✅ M-Pesa payments working correctly
✅ Enhanced card payment configuration
✅ Improved billing address collection
✅ Better error handling and logging

The card payment system has been significantly improved with better billing address collection and enhanced payment data structure. Test with the updated checkout form to see if card payments now work correctly.