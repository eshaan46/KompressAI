# KompressAI

## Problem Statement

-Deploying large-scale AI models on low-power or embedded devices is a major challenge.

- These models require high computational power and large memory capacity.

- They often depend on continuous cloud access, limiting their use in remote or edge-based environments.

- This makes them unsuitable for cost-sensitive applications in industries such as agriculture, robotics, and healthcare.

- On-device intelligence is essential in these sectors for real-time decision-making and reliability.

- KompressAI addresses these challenges by enabling efficient and accessible AI model deployment.

- It directly supports Sustainable Development Goal (SDG) 9 by promoting innovation and fostering sustainable infrastructure.

## Objectives
- Enable efficient AI model deployment on resource-constrained hardware.
- Simplify compression through a no-code, user-friendly interface.
- Reduce power consumption and latency without sacrificing accuracy.
- Democratize AI deployment for innovators, educators, and small-scale developers.
## Solution
- We made a website where users are able to create projects and submit their AI models
- then they are able to tell us what hardware and how they want their AI models to compress. These are the following features we include
  - Hardware
    - GPU's
    - CPU's
    - MCU's
    - Edge Devices
  - Optimization Level
    - Lantency(to increase speed of processing)
    - Size(decrease size of models)
    - Accuracy (focus more on retaining accuracy)
- Bassed on these the usser chooses any commbination of the two that suits his needs best
- then we use our in house built AI model to predict the best way to achive the best compression for the give situation
- our AI  is able to understandwhat exactlly the model needs so if someone has access to good hardware and wants to increaase accuracy or latency our AI model understands it and can improve the performance of the model by increasing its size and reducing latency or increassing accuracy
- and when thier are thgiht constraints on hardware our model can reduce the size of the users model by 70% while retaaining  accruacy within a 0.001% margin and without increasing latency at all

## How It Works
- We first recieve data from the usser and have the file names and configarations of the user in a config json file
- we then use the json fole to acces the userrs model and test data they have sent
- then we pass the model and test daata through the model allong with their prefrences and then our model compresses it
- we trainned our model on variouse compression algorithms adn their advantages and disadvantages and it figures out the best way to compress the model bassed on them and then does it
- the following are some of the algorithms we trainned it on
  - Dynamic Quantanization
  - Weight Sharring
  - Unstructurred Pruning
  -  Layer Dropping
  -  JIT Fussion
  - Etc
- Ussing these the model understands the best way to compress it so it can either improve accuracy latency and size
- 
## Advantaages
- All algorithms ussed are Post training so their is no need for the usser to trian the algorithm again and it helps us stream line the process
- Adaptive Model Scaling: The system performs real-time hardware profiling and automatically adjusts model size—compressing for constrained devices and expanding architectures on high-performance hardware—to maximize accuracy, throughput, and resource utilization in any deployment environment.
## TechStack
- Torch
- padnas
- numpy
- json
- sci-kit-learn

## Disclosure
- We ussed chatgpt to make the datatset and trouble shoot the code
- we ussed supabse and pytorch to build our tool
