#!/bin/bash

# Variables
KEY_NAME="aws-key-cli"
KEY_FILE="$KEY_NAME.pem"
AMI_ID="ami-0c7217cdde317cfec"
INSTANCE_TYPE="t2.micro"
COUNT=1

# Step 1: Create key pair if it doesn’t exist
echo "Checking if key pair $KEY_NAME exists..."
aws ec2 describe-key-pairs --key-names $KEY_NAME >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Key pair not found. Creating new key pair..."
  aws ec2 create-key-pair --key-name $KEY_NAME \
    --query 'KeyMaterial' --output text > $KEY_FILE
  chmod 400 $KEY_FILE
  echo "Key pair created and saved to $KEY_FILE"
else
  echo "Key pair already exists."
fi

# Step 2: Launch EC2 instance
echo "Launching EC2 instance..."
INSTANCE_INFO=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --count $COUNT \
  --instance-type $INSTANCE_TYPE \
  --key-name $KEY_NAME)

INSTANCE_ID=$(echo $INSTANCE_INFO | jq -r '.Instances[0].InstanceId')
echo "Instance launched with ID: $INSTANCE_ID"

# Step 3: Wait until running
echo "Waiting for instance to be in 'running' state..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID
echo "Instance is now running."

# Step 4: Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query "Reservations[*].Instances[*].PublicIpAddress" \
  --output text)

echo "Instance Public IP: $PUBLIC_IP"
echo "Connect using: ssh -i $KEY_FILE ec2-user@$PUBLIC_IP"
