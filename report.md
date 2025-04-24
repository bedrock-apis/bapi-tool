Using D:\lush-way\scripts\tsconfig.json
Parsed config which includes 373 files
Scanning for [
  '@minecraft/server',
  '@minecraft/server-ui',
  '@minecraft/server-net',
  '@minecraft/server-admin',
  '@minecraft/common'
]
 
Top 20 most used symbols: 
 
  Entity.id 260
  Vector3.x 100
  Vector3.z 96
  Vector3.y 93
  Entity.isValid 66
  Entity.location 65
  ItemStack.typeId 63
  World.afterEvents 58
  Entity.dimension 48
  Player 48
  Player.name 43
  Player.onScreenDisplay 42
  Entity.teleport 34
  System.runInterval 34
  Block.typeId 34
  Entity.getComponent 32
  Dimension.getBlock 32
  Player 32
  ScreenDisplay.setActionBar 31
  ScreenDisplay.setActionBar 31
 

Total symbols count: 462/2876 symbols (16%)
 
@minecraft/server: 385/2500 symbols (15%)
D:/lush-way/scripts/src/lib/extensions: 9/9 symbols (100%)
@minecraft/server-net: 7/279 symbols (3%)
D:/lush-way/scripts/src/lib/database: 1/1 symbols (100%)

@minecraft/server-ui: 22/62 symbols (35%)
@minecraft/common: 2/14 symbols (14%)
@minecraft/server-admin: 1/11 symbols (9%)
 
 
 
> @minecraft/server
 
 
System
 
 beforeEvents 4
 run 10
 afterEvents 5
 runJob 13
 runTimeout 21
 clearRun 6
 runInterval 34
 
SystemBeforeEvents
 
 watchdogTerminate 1
 startup 2
 
WatchdogTerminateBeforeEventSignal
 
 subscribe 1
 
WatchdogTerminateBeforeEvent
 
 terminateReason 1
 cancel 1
 
ContainerSlot
 
 hasItem 4
 getItem 18
 setItem 27
 typeId 15
 amount 13
 isValid 3
 isStackable 2
 getDynamicProperty 3
 setLore 10
 getDynamicPropertyIds 3
 setDynamicProperty 1
 getLore 6
 nameTag 18
 
Dimension
 
 getEntities 26
 id 2
 spawnEntity 14
 runCommand 6
 getBlock 32
 getBlockFromRay 3
 setBlockPermutation 1
 spawnParticle 6
 spawnItem 2
 getPlayers 1
 createExplosion 5
 playSound 1
 setBlockType 5
 heightRange 3
 
SystemAfterEvents
 
 scriptEventReceive 4
 
ScriptEventCommandMessageAfterEventSignal
 
 subscribe 4
 
ScriptEventCommandMessageAfterEvent
 
 id 10
 message 3
 sourceType 1
 
global
 
 Dimension 4
 ItemStack 4
 Player 16
 ContainerSlot 2
 RawMessage 28
 Entity 2
 GameMode 1
 Container 2
 ScreenDisplay 1
 TitleDisplayOptions 1
 RawText 1
 System 1
 World 1
 Vector3 2
 WorldAfterEvents 2
 PlayerJoinAfterEvent 1
 PlayerSpawnAfterEvent 1
 ItemType 1
 
Vector3
 
 x 100
 y 93
 z 96
 
Entity
 
 id 260
 isValid 66
 getViewDirection 10
 applyKnockback 2
 matches 3
 getComponent 32
 applyDamage 4
 runCommand 13
 getDynamicProperty 13
 location 65
 teleport 34
 remove 27
 setDynamicProperty 10
 nameTag 16
 getRotation 7
 isOnGround 2
 setProperty 9
 typeId 17
 isSneaking 7
 getHeadLocation 8
 dimension 48
 addEffect 11
 hasTag 6
 triggerEvent 1
 addTag 6
 getEffect 1
 removeEffect 3
 getEntitiesFromViewDirection 1
 kill 4
 applyImpulse 3
 getProperty 2
 getEffects 1
 getVelocity 1
 setRotation 1
 getBlockFromViewDirection 12
 getComponents 2
 getTags 2
 removeTag 2
 
Player
 
 setGameMode 13
 name 43
 playSound 24
 sendMessage 2
 getGameMode 10
 onScreenDisplay 42
 resetLevel 1
 addExperience 1
 getTotalXp 1
 isFlying 1
 selectedSlotIndex 5
 camera 7
 spawnParticle 3
 addLevels 2
 level 2
 
GameMode
 
 spectator 6
 survival 12
 adventure 9
 creative 3
 
World
 
 afterEvents 58
 getPlayers 6
 getAllPlayers 29
 sendMessage 1
 getDimension 4
 structureManager 16
 setDynamicProperty 3
 getDynamicProperty 3
 scoreboard 10
 beforeEvents 18
 setDefaultSpawnLocation 1
 gameRules 2
 setTimeOfDay 2
 
WorldAfterEvents
 
 playerSpawn 13
 playerLeave 2
 worldLoad 1
 itemUse 7
 playerBreakBlock 4
 entitySpawn 5
 entityDie 12
 entityHurt 8
 playerJoin 2
 dataDrivenEntityTrigger 1
 playerInteractWithEntity 2
 playerPlaceBlock 2
 
PlayerSpawnAfterEventSignal
 
 subscribe 10
 unsubscribe 1
 
ScriptEventSource
 
 Server 1
 
RawText
 
 rawtext 12
 
ItemStack
 
 getComponent 2
 nameTag 20
 setLore 8
 clone 8
 isStackable 3
 isStackableWith 1
 getLore 12
 typeId 63
 amount 14
 lockMode 7
 keepOnDeath 6
 setCanDestroy 3
 setCanPlaceOn 3
 setDynamicProperty 5
 getDynamicProperty 6
 getCanDestroy 2
 getCanPlaceOn 2
 getDynamicPropertyIds 3
 
EntityAttributeComponent
 
 currentValue 10
 setCurrentValue 4
 resetToMaxValue 2
 effectiveMax 3
 defaultValue 2
 
EquipmentSlot
 
 Chest 8
 Feet 5
 Head 5
 Legs 5
 Mainhand 1
 Offhand 6
 
EntityEquippableComponent
 
 getEquipmentSlot 7
 setEquipment 8
 getEquipment 6
 
EntityDamageCause
 
 entityAttack 5
 fireTick 2
 magic 1
 fireworks 1
 projectile 2
 entityExplosion 1
 
Container
 
 size 10
 getItem 10
 getSlot 4
 clearAll 4
 setItem 11
 addItem 17
 emptySlotsCount 4
 
PlayerLeaveAfterEventSignal
 
 subscribe 2
 
ScreenDisplay
 
 setActionBar 31
 updateSubtitle 1
 setTitle 1
 getHiddenHudElements 1
 hideAllExcept 2
 resetHudElements 2
 setHudVisibility 1
 isForcedHidden 1
 
TitleDisplayOptions
 
 fadeInDuration 1
 fadeOutDuration 1
 stayDuration 2
 subtitle 2
 
StructureManager
 
 place 5
 delete 5
 createFromWorld 3
 getWorldStructureIds 1
 get 2
 
StructureSaveMode
 
 World 2
 Memory 1
 
WorldLoadAfterEventSignal
 
 subscribe 1
 
ScoreboardObjective
 
 id 9
 setScore 3
 getScore 2
 getParticipants 2
 removeParticipant 2
 displayName 10
 getScores 2
 addScore 1
 
Scoreboard
 
 getObjective 4
 addObjective 2
 getObjectives 3
 removeObjective 1
 
ChatSendAfterEvent
 
 sender 26
 message 6
 
WorldBeforeEvents
 
 chatSend 1
 playerInteractWithEntity 4
 playerInteractWithBlock 3
 playerPlaceBlock 2
 playerBreakBlock 2
 itemUse 2
 playerLeave 1
 explosion 2
 
ChatSendBeforeEventSignal
 
 subscribe 1
 
ChatSendBeforeEvent
 
 cancel 1
 
Enchantment
 
 type 9
 level 18
 
EnchantmentType
 
 id 7
 maxLevel 2
 
RawMessage
 
 text 2
 translate 2
 with 6
 rawtext 4
 
Vector2
 
 x 4
 y 3
 
PlayerSpawnAfterEvent
 
 initialSpawn 1
 player 2
 
ItemTypes
 
 get 2
 getAll 1
 
ItemLockMode
 
 inventory 1
 slot 1
 
ItemUseAfterEventSignal
 
 subscribe 8
 
ItemUseAfterEvent
 
 source 25
 itemStack 8
 
PlayerBreakBlockAfterEventSignal
 
 subscribe 4
 
PlayerBreakBlockAfterEvent
 
 player 2
 brokenBlockPermutation 2
 
EntitySpawnAfterEventSignal
 
 subscribe 5
 
EntityNpcComponent
 
 name 2
 skinIndex 1
 
PlayerInteractWithEntityBeforeEventSignal
 
 subscribe 4
 
PlayerInteractWithEntityBeforeEvent
 
 target 21
 player 11
 cancel 3
 
Block
 
 isValid 5
 isLiquid 3
 isAir 11
 location 21
 dimension 10
 setPermutation 8
 getComponent 5
 typeId 34
 below 4
 setType 10
 isWaterlogged 1
 setWaterlogged 1
 permutation 21
 getItemStack 1
 isSolid 2
 y 3
 canContainLiquid 2
 offset 1
 
Camera
 
 setCamera 4
 fade 3
 
EasingType
 
 OutCubic 1
 Linear 1
 
StartupBeforeEventSignal
 
 subscribe 2
 
BlockTypes
 
 getAll 3
 get 3
 
BlockType
 
 id 20
 
BlockPermutation
 
 resolve 11
 type 18
 getAllStates 20
 withState 4
 matches 1
 
Structure
 
 getBlockPermutation 1
 
MolangVariableMap
 
 setColorRGBA 4
 setVector3 2
 
PlayerInteractWithBlockBeforeEvent
 
 block 15
 player 6
 cancel 4
 itemStack 9
 isFirstEvent 4
 
PlayerInteractWithBlockBeforeEventSignal
 
 subscribe 4
 
PlayerPlaceBlockBeforeEventSignal
 
 subscribe 2
 
BlockEvent
 
 block 16
 dimension 3
 
PlayerPlaceBlockBeforeEvent
 
 player 2
 cancel 5
 
PlayerBreakBlockBeforeEventSignal
 
 subscribe 2
 
PlayerBreakBlockBeforeEvent
 
 player 2
 cancel 2
 itemStack 3
 
BlockInventoryComponent
 
 container 8
 
ItemEnchantableComponent
 
 getEnchantments 17
 addEnchantment 5
 getEnchantment 4
 removeEnchantment 1
 addEnchantments 2
 removeAllEnchantments 1
 
ItemDurabilityComponent
 
 damage 11
 maxDurability 1
 
EntitySpawnAfterEvent
 
 entity 3
 
EntityDieAfterEventSignal
 
 subscribe 10
 unsubscribe 2
 
EntityDieAfterEvent
 
 deadEntity 16
 
EntityHurtAfterEventSignal
 
 subscribe 8
 
EntityHurtAfterEvent
 
 hurtEntity 3
 damageSource 8
 damage 2
 
EntityDamageSource
 
 damagingEntity 10
 cause 1
 damagingProjectile 1
 
ScoreboardScoreInfo
 
 score 3
 participant 2
 
ScoreboardIdentity
 
 displayName 6
 type 1
 
EntityRaycastHit
 
 entity 4
 
PlayerJoinAfterEventSignal
 
 subscribe 1
 
ItemUseBeforeEventSignal
 
 subscribe 3
 
ItemUseBeforeEvent
 
 cancel 2
 
PlayerLeaveBeforeEventSignal
 
 subscribe 1
 
PlayerLeaveBeforeEvent
 
 player 1
 
EntityProjectileComponent
 
 owner 1
 shoot 1
 
DataDrivenEntityTriggerAfterEventSignal
 
 subscribe 1
 
DataDrivenEntityTriggerAfterEvent
 
 entity 7
 
Effect
 
 typeId 1
 
ScoreboardIdentityType
 
 FakePlayer 1
 
ExplosionBeforeEventSignal
 
 subscribe 2
 
ExplosionAfterEvent
 
 getImpactedBlocks 2
 source 2
 
ExplosionBeforeEvent
 
 setImpactedBlocks 1
 cancel 1
 
PlayerInteractWithEntityAfterEventSignal
 
 subscribe 2
 
PlayerInteractWithEntityAfterEvent
 
 target 2
 player 2
 
PlayerPlaceBlockAfterEventSignal
 
 subscribe 2
 
EntityItemComponent
 
 itemStack 1
 
TimeOfDay
 
 Day 1
 
BlockRaycastHit
 
 block 18
 
LiquidType
 
 Water 2
 
StructureRotation
 
 Rotate270 2
 Rotate90 2
 None 3
 Rotate180 1
 
StructureMirrorAxis
 
 None 2
 X 1
 XZ 1
 Z 1
 
PlayerInteractWithBlockAfterEventSignal
 
 subscribe 1
 
PlayerInteractWithBlockAfterEvent
 
 itemStack 1
 player 1
 
BlockStates
 
 getAll 1
 get 1
 
BlockStateType
 
 id 1
 validValues 3
 
Direction
 
 Down 1
 
ItemType
 
 id 1
 
 
> D:/lush-way/scripts/src/lib/extensions
 
 
global
 
 Dimension 4
 ItemStack 4
 Player 32
 Entity 2
 Container 2
 ScreenDisplay 1
 System 1
 World 1
 
ScreenDisplay
 
 setActionBar 31
 
 
> @minecraft/server-net
 
 
HttpClient
 
 request 1
 
HttpRequest
 
 setMethod 1
 addHeader 2
 setBody 1
 
HttpRequestMethod
 
 Post 1
 
HttpResponse
 
 status 3
 body 3
 
 
> D:/lush-way/scripts/src/lib/database
 
 
global
 
 Player 48
 
 
> D:/lush-way/scripts/node_modules/@minecraft/server-gametest
 
 
global
 
 SimulatedPlayer 4
 Test 2
 registerAsync 4
 Tags 4
 
Test
 
 spawnSimulatedPlayer 9
 idle 30
 print 4
 fail 1
 succeedWhen 6
 assert 18
 worldLocation 5
 getDimension 6
 assertBlockPresent 7
 succeed 8
 setBlockType 3
 relativeLocation 1
 
SimulatedPlayer
 
 respawn 1
 chat 4
 useItemOnBlock 3
 breakBlock 3
 stopBreakingBlock 3
 useItemInSlotOnBlock 1
 moveToBlock 3
 stopMoving 3
 lookAtBlock 3
 attack 3
 interactWithBlock 3
 stopInteracting 2
 lookAtEntity 1
 
RegistrationBuilder
 
 maxTicks 7
 structureName 10
 tag 4
 padding 3
 
Tags
 
 suiteDebug 1
 suiteDisabled 3
 
 
> @minecraft/server-ui
 
 
ActionFormData
 
 show 1
 title 4
 body 2
 button 3
 
ModalFormData
 
 show 1
 title 1
 dropdown 2
 slider 1
 toggle 1
 textField 1
 
MessageFormData
 
 show 1
 title 1
 body 1
 button2 1
 button1 1
 
FormResponse
 
 canceled 1
 cancelationReason 2
 
FormCancelationReason
 
 UserClosed 1
 UserBusy 1
 
MessageFormResponse
 
 selection 1
 
ModalFormResponse
 
 formValues 2
 
ActionFormResponse
 
 selection 6
 
 
> @minecraft/common
 
 
NumberRange
 
 max 1
 min 1
 
 
> @minecraft/server-admin
 
 
global
 
 SecretString 2
 
