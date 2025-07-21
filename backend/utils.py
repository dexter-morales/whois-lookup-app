import requests

def fetch_whois_data(domain, info_type, api_key):
    url = "https://www.whoisxmlapi.com/whoisserver/WhoisService"
    params = {
        "apiKey": api_key,
        "domainName": domain,
        "outputFormat": "JSON"
    }

    response = requests.get(url, params=params)
    data = response.json()

    if 'WhoisRecord' not in data:
        raise Exception("Invalid response or domain not found")

    record = data['WhoisRecord']
    
    if info_type == 'domain':
        return {
            'domainName': record.get('domainName'),
            'registrarName': record.get('registrarName'),
            'createdDate': record.get('createdDate'),
            'expiresDate': record.get('expiresDate'),
            'estimatedDomainAge': record.get('estimatedDomainAge'),
            'hostnames': format_hostnames(record.get('nameServers', {}).get('hostNames', []))
        }
    elif info_type == 'contact':
        return {
            'registrantName': record.get('registrant', {}).get('name'),
            'technicalContactName': record.get('technicalContact', {}).get('name'),
            'administrativeContactName': record.get('administrativeContact', {}).get('name'),
            'contactEmail': record.get('contactEmail')
        }
    else:
        raise Exception("Invalid type requested")

def format_hostnames(hostnames):
    joined = ', '.join(hostnames)
    return joined[:25] + '...' if len(joined) > 25 else joined
